import { Prisma, User } from '@prisma/client'
import customConfig from '../config/default'
import { signJwt } from '../utils/jwt'
import { prisma } from '../utils/prisma'

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User
}

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  })
}

export const findUser = async (where: Partial<Prisma.UserWhereInput>) => {
  return await prisma.user.findFirst({
    where,
    include: {
      likedTo: {
        select: { id: true },
      },
    },
  })
}

export const findUsers = async () => {
  return await prisma.user.findMany({
    include: {
      likedBy: {
        select: { id: true },
      },
    },
  })
}

export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput) => {
  return (await prisma.user.findUnique({
    where,
    include: {
      likedTo: {
        select: { id: true },
      },
    },
  })) as User
}

export const updateUser = async (
  where: Partial<Prisma.UserWhereUniqueInput>,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect,
) => {
  return (await prisma.user.update({ where, data, select })) as User
}

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${customConfig.accessTokenExpiresIn}m`,
  })

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
  })

  return { access_token, refresh_token }
}
