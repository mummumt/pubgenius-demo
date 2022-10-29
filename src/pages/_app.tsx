import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import { trpc } from '@/utils/trpc'
import { useEffect } from 'react'
import { getCookie } from 'cookies-next'
import theme from '@/styles/theme'
import { ReactNode, useMemo, useState } from 'react'
import createEmotionCache from '@/utils/createEmotionCache'
import ClientStyleContext from '@/contexts/ClientStyleContext'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import Redirect from '@/components/util/Redirect'

type ClientCacheProviderProps = {
  children: ReactNode
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache())

  const value = useMemo(() => {
    return {
      reset: () => {
        setCache(createEmotionCache())
      },
    }
  }, [])

  return (
    <ClientStyleContext.Provider value={value}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter()
  const userQuery = trpc.user.me.useQuery(undefined, { enabled: router.pathname !== '/login' })
  const isLoginPage = router.pathname !== '/login'

  useEffect(() => {
    // request for refresh token if present
    const refresh = async () => {
      await fetch(`http://localhost:3000/api/trpc/auth.refresh?batch=1&input=%7B%7D`)
    }
    const refreshToken = getCookie('refresh_token')

    if (refreshToken) refresh()
  }, [])

  console.log('userQuery', userQuery)
  if (!userQuery.isFetching && userQuery.isError && isLoginPage) return <Redirect href="/login" replace />

  return (
    <ClientCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ClientCacheProvider>
  )
}
export default trpc.withTRPC(MyApp)
