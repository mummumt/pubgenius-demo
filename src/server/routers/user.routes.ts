import * as trpc from '@trpc/server'
import { getMeHandler, getUsersHandler } from '../controllers/user.controller'
import { protectedProcedure, publicProcedure, router } from '@/server/trpc'

const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
  users: publicProcedure.query(({ ctx }) => getUsersHandler({ ctx })),
})

export default userRouter
