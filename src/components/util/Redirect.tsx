import Router from 'next/router'
import React from 'react'

type RedirectProps = {
  href: Parameters<typeof Router.push>[0]
  asPath?: Parameters<typeof Router.push>[1]
  options?: Parameters<typeof Router.push>[2]
  replace?: boolean
}

const Redirect = ({ href, asPath, options, replace = false }: RedirectProps) => {
  React.useEffect(() => {
    if (replace) Router.replace(href, asPath, options)
    else Router.push(href, asPath, options)
  }, [href, asPath, options, replace])

  return <></>
}

export default Redirect
