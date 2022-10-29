import * as trpc from '@trpc/server'
import { getMeHandler } from '../controllers/user.controller'
import { protectedProcedure, router } from '@/server/trpc'

const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
})

export default userRouter
