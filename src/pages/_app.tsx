import '../styles/globals.css'
import type { AppProps, AppType } from 'next/app'
import { trpc } from '@/utils/trpc'
import theme from '@/styles/theme'
import { ReactNode, useMemo, useState } from 'react'
import createEmotionCache from '@/utils/createEmotionCache'
import ClientStyleContext from '@/contexts/ClientStyleContext'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import Redirect from '@/components/util/Redirect'
import store from '@/app/store'
import { Provider } from 'react-redux'

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

  return (
    <ClientCacheProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ClientCacheProvider>
  )
}
export default trpc.withTRPC(MyApp)
