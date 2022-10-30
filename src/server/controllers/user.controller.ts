import { Context } from '@/server/createContext'
import { LikeUserInput } from '@/server/schema/user.schema'
import { findUsers } from '@/server/services/user.service'

import { TRPCError } from '@trpc/server'

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user
    return {
      status: 'success',
      data: {
        user,
      },
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const getUsersHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const users = await findUsers()
    return {
      status: 'success',
      data: {
        users,
      },
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const likeUserHandler = async ({ input, ctx: { req, res } }: { input: LikeUserInput; ctx: any }) => {
  try {
    console.log('input', input)
    // const users = await findUsers()
    return {
      status: 'success',
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
