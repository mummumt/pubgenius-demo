import * as trpc from '@trpc/server'
import { getMeHandler, getUsersHandler, likeUserHandler } from '../controllers/user.controller'
import { protectedProcedure, publicProcedure, router } from '@/server/trpc'
import { likeUserSchema } from '@/server/schema/user.schema'

const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
  users: publicProcedure.query(({ ctx }) => getUsersHandler({ ctx })),
  like: protectedProcedure.input(likeUserSchema).mutation(({ input, ctx }) => likeUserHandler({ input, ctx })),
})

export default userRouter
