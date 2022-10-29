import Error500Svg from '@/components/svg/Error500Svg'
import ErrorLayout from '@/layout/ErrorLayout'
import { NextPage } from 'next'
import React from 'react'

const InternalServerErrorPage: NextPage = () => {
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

export default InternalServerErrorPage
