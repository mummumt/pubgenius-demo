import path from 'path'

// Public and private keys are normally configured in server's environment variable, this is for demo only

const publicKey = 'secret'
const privateKey = 'secret'

const customConfig: {
  port: number
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  origin: string
  dbUri: string
  accessTokenPrivateKey: string
  accessTokenPublicKey: string
  refreshTokenPrivateKey: string
  refreshTokenPublicKey: string
} = {
  port: 3000,
  accessTokenExpiresIn: 60,
  refreshTokenExpiresIn: 60 * 24 * 30,
  origin: 'http://localhost:3000',
  dbUri: process.env.PRISMA_DATABASE_URL ?? '',
  accessTokenPrivateKey: privateKey,
  accessTokenPublicKey: publicKey,
  refreshTokenPrivateKey: privateKey,
  refreshTokenPublicKey: publicKey,
}

export default customConfig
