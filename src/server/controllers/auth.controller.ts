import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { OptionsType } from 'cookies-next/lib/types'
import { getCookie, setCookie } from 'cookies-next'
import customConfig from '../config/default'
import { Context } from '../createContext'
import { CreateUserInput, LoginUserInput } from '../schema/user.schema'
import { createUser, deleteUser, findUniqueUser, findUser, signTokens } from '../services/user.service'
import { signJwt, verifyJwt } from '../utils/jwt'
import { sanitize } from '@/utils/sanitizeHtml'

// [...] Cookie options
const cookieOptions: OptionsType = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
}

const accessTokenCookieOptions: OptionsType = {
  ...cookieOptions,
  expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 60 * 1000),
}

const refreshTokenCookieOptions: OptionsType = {
  ...cookieOptions,
  expires: new Date(Date.now() + customConfig.refreshTokenExpiresIn * 60 * 1000),
}

export const registerHandler = async ({ input }: { input: CreateUserInput }) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12)
    const sanitizedUserDetails = sanitize(input.userDetails)

    const user = await createUser({
      username: input.username,
      password: hashedPassword,
      profileUrl: input.profileUrl,
      userDetails: sanitizedUserDetails,
    })

    return {
      status: 'success',
      data: {
        user,
      },
    }
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User already exists',
      })
    }
    throw err
  }
}

export const loginHandler = async ({ input, ctx: { req, res } }: { input: LoginUserInput; ctx: any }) => {
  try {
    // Get the user from the collection
    const user = await findUser({ username: input.username })

    // Check if user exist and password is correct
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid username or password',
      })
    }

    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signTokens(user)

    // Send Access Token in Cookie
    setCookie('access_token', access_token, {
      req,
      res,
      ...accessTokenCookieOptions,
    })
    setCookie('refresh_token', refresh_token, {
      req,
      res,
      ...refreshTokenCookieOptions,
    })
    setCookie('logged_in', 'true', {
      req,
      res,
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // Send Access Token
    return {
      status: 'success',
      access_token,
    }
  } catch (err: any) {
    throw err
  }
}

export const refreshAccessTokenHandler = async ({ ctx: { req, res } }: { ctx: any }) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = getCookie('refresh_token', { req, res }) as string

    const message = 'Could not refresh access token'
    if (!refresh_token) {
      throw new TRPCError({ code: 'FORBIDDEN', message })
    }

    // Validate the Refresh token
    const decoded = verifyJwt<{ sub: string }>(refresh_token, 'refreshTokenPublicKey')

    if (!decoded) {
      throw new TRPCError({ code: 'FORBIDDEN', message })
    }

    // Check if the user exist
    const user = await findUniqueUser({ id: decoded.sub })

    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN', message })
    }

    // Sign new access token
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${customConfig.accessTokenExpiresIn}m`,
    })

    // Send the access token as cookie
    setCookie('access_token', access_token, {
      req,
      res,
      ...accessTokenCookieOptions,
    })
    setCookie('logged_in', 'true', {
      req,
      res,
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // Send response
    return {
      status: 'success',
      access_token,
    }
  } catch (err: any) {
    throw err
  }
}

const logout = ({ ctx: { req, res } }: { ctx: any }) => {
  setCookie('access_token', '', { req, res, maxAge: -1 })
  setCookie('refresh_token', '', { req, res, maxAge: -1 })
  setCookie('logged_in', '', { req, res, maxAge: -1 })
}

export const logoutHandler = async ({ ctx }: { ctx: any }) => {
  try {
    const user = ctx.user
    logout({ ctx })
    return { status: 'success' }
  } catch (err: any) {
    throw err
  }
}

export const deleteHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user
    logout({ ctx })
    deleteUser(user?.id!)

    return { status: 'success' }
  } catch (err: any) {
    throw err
  }
}
