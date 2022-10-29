import { Context } from '@/server/createContext'

import { TRPCError } from '@trpc/server'

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  console.log('callinggetme', ctx)
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
