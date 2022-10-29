import customConfig from '@/server/config/default'
import authRouter from '@/server/routers/auth.routes'
import userRouter from '@/server/routers/user.routes'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure.query(({ input }) => {
    return {
      greeting: `hello  world`,
    }
  }),
  user: userRouter,
  auth: authRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
