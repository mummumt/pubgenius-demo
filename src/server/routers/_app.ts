import { z } from "zod"
import { publicProcedure, router } from "../trpc"
export const appRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.id ?? "world"}`,
      }
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
