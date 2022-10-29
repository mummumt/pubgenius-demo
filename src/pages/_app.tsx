import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import { trpc } from '@/utils/trpc'
import { useEffect } from 'react'

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // Send the access token as cookie
    const refresh = async () => {
      const response = await fetch(`http://localhost:3000/api/trpc/auth.refresh?batch=1&input=%7B%7D`)
      console.log(response)
    }
    refresh()
  }, [])

  return <Component {...pageProps} />
}
export default trpc.withTRPC(MyApp)
