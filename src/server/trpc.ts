import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './createContext'

const t = initTRPC.context<Context>().create()
// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
/**
 * Reusable middleware that checks if users are authenticated.
 * @note Example only, yours may vary depending on how your auth is setup
 **/
const isAuthed = t.middleware(({ next, ctx }) => {
  console.log('ctxxxxxxxxxxxxx', ctx.user)
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
  return next({
    ctx,
  })
})
// Protected procedures for logged in users only
export const protectedProcedure = t.procedure.use(isAuthed)
