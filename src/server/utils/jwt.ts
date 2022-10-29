import jwt, { SignOptions } from 'jsonwebtoken'
import customConfig from '../config/default'

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {},
) => {
  const privateKey = customConfig[key]
  return jwt.sign(payload, privateKey, {
    ...(options && options),
  })
}

export const verifyJwt = <T>(token: string, key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null => {
  try {
    const publicKey = customConfig[key]
    return jwt.verify(token, publicKey) as T
  } catch (error) {
    console.log(error)
    return null
  }
}
