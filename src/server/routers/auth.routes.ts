import { publicProcedure, router } from '@/server/trpc'
import { loginHandler, logoutHandler, refreshAccessTokenHandler, registerHandler } from '../controllers/auth.controller'

import { createUserSchema, loginUserSchema } from '../schema/user.schema'

const authRouter = router({
  register: publicProcedure.input(createUserSchema).mutation(({ input }) => registerHandler({ input })),
  login: publicProcedure.input(loginUserSchema).mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logout: publicProcedure.mutation(({ ctx }) => logoutHandler({ ctx })),
  refresh: publicProcedure.query(({ ctx }) => refreshAccessTokenHandler({ ctx })),
})

export default authRouter
