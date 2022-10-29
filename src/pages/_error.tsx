import Error404Svg from '@/components/svg/Error404Svg'
import Error500Svg from '@/components/svg/Error500Svg'
import ErrorLayout from '@/layout/ErrorLayout'
import { Button } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

type ErrorPageProps = {
  statusCode: number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  switch (statusCode) {
    case 404:
      return (
        <ErrorLayout
          meta={{ title: `Page not found`, description: 'Page not found' }}
          statusCode={404}
          message="The page you are looking for isn’t here"
          description="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."
          icon={
            <Error404Svg
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
          }
          action={
            <Link href="/" passHref>
              <Button color="primary" variant="outlined">
                Back to Home
              </Button>
            </Link>
          }
        />
      )

    case 500:
    default:
      return (
        <ErrorLayout
          meta={{ title: `Internal Server Error`, description: 'Internal Server Error' }}
          statusCode={500}
          message="Internal Server Error"
          description="Something went wrong. Please try again later."
          icon={
            <Error500Svg
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
          }
        />
      )
  }
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500
  return { statusCode }
}

export default ErrorPage
