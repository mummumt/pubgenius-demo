import "../styles/globals.css"
import type { AppProps, AppType } from "next/app"
import { trpc } from "@/utils/trpc"

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default trpc.withTRPC(MyApp)
