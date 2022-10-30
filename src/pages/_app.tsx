import '../styles/globals.css'
import type { AppType } from 'next/app'
import { trpc } from '@/utils/trpc'
import theme from '@/styles/theme'
import { ReactNode, useMemo, useState } from 'react'
import createEmotionCache from '@/utils/createEmotionCache'
import ClientStyleContext from '@/contexts/ClientStyleContext'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import store from '@/app/store'
import { Provider } from 'react-redux'
import { Notification } from '@/components/common/Notification'

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
  return (
    <ClientCacheProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Notification />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ClientCacheProvider>
  )
}
export default trpc.withTRPC(MyApp)
