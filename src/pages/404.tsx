import Error404Svg from '@/components/svg/Error404Svg'
import ErrorLayout from '@/layout/ErrorLayout'
import { Button } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const NotFoundPage: NextPage = () => {
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
}

export default NotFoundPage
