import path from 'path'

const publicKey = [
  '-----BEGIN PUBLIC KEY-----',
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnOm8pOlbLAzxz3Rv+DWGxeH+C',
  'ge3WQdkETjB7mfOIX/yKdRXD+TOyPYaVie3jZ1/J3pUV+MkJ0GemeSXxhzda2Qkly3qOwiky0BU4PLpmO1WUd28CvNNceNTnA0lm3HF38OkGiwKMh9KXfqzY714XTuJI',
  'xPcjyiPs7gTEBi7u6wIDAQAB',
  '-----END PUBLIC KEY-----',
].join('\n')

const privateKey = [
  '-----BEGIN RSA PRIVATE KEY-----',
  'MIICWwIBAAKBgQDnOm8pOlbLAzxz3Rv+DWGxeH+Cge3WQdkETjB7mfOIX/yKdRXD',
  '+TOyPYaVie3jZ1/J3pUV+MkJ0GemeSXxhzda2Qkly3qOwiky0BU4PLpmO1WUd28C',
  'vNNceNTnA0lm3HF38OkGiwKMh9KXfqzY714XTuJIxPcjyiPs7gTEBi7u6wIDAQAB',
  'AoGAX39/x5xDmmcEwamRVRS7w2tL5l+5FeNuONv+JB5KOYnDKIAA9EZo9nV4rywf',
  'Jutb4WjfVArDJR2AoX2pkR5SWpcOJJ+1iSsXF8XT1GSIqcG02NBUlOSElq3FUMQ8',
  'ZIPHbInLU/DzZYS7zeDBq5/Ro5bwnjKV9Wvv4yvoRr5OpikCQQD0JKyV090I9r2K',
  'qJwK+2pxUqM21Q83PtYG8qWUDsZXz+k/BRQ31WHkyO2WGhhiOtHceV2Elt7sOlhR',
  'K78MxqVPAkEA8nUxjDDBBUPyfvriiiFwTu29+CY2IjWygZ87Ji7rnPK98e6Pm+fE',
  'yEVY8U6pCyT13Jo45lpshAyG30RhcJCtpQJAUzYgwJxKTODUL2tSbAfO+rrguDKc',
  'EgdPqWSQfMsgXROW+wy/HFyVFgZJvAw+3VQQ7SVMc4F8j2U/bsMLRc56zwJAOdxt',
  '7p7T8YW9oUAOQBiqzKs/4rB7yr4102lEnGAmKlZjrhDYhMRS2dhy2WOEQ/yWEAdd',
  '/Nsnenvi0/Vlq49bYQJAVoEyjpSnya+btCdi9VCQ7WldRbdjrCDkwGtGf9yupwI2FLLuKNfIXiDIVsKNkGSxyOutTBVC1ZQt96lzk4Wt7Q==',
  '-----END RSA PRIVATE KEY-----',
].join('\n')

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
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  origin: 'http://localhost:3000',
  dbUri: process.env.PRISMA_DATABASE_URL ?? '',
  accessTokenPrivateKey: privateKey,
  accessTokenPublicKey: publicKey,
  refreshTokenPrivateKey: privateKey,
  refreshTokenPublicKey: publicKey,
}

// Public and private keys are normally configured in server's environment variable, this is for demo only

export default customConfig
