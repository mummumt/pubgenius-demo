import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { PrismaClient } from '@prisma/client'
import { deserializeUser } from '@/server/middleware/deserializeUser'

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const deserialized = await deserializeUser({ req: opts?.req, res: opts?.res })

  return deserialized
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
