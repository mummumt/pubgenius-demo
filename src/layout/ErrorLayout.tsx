import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Head from 'next/head'

type ErrorLayoutProps = {
  meta: {
    title: string
    description: string
  }
  statusCode: number
  message: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ meta, statusCode, message, description, icon, action }) => {
  const theme = useTheme()

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100%',
          px: 3,
          py: '80px',
          backgroundColor: 'background.paper',
        }}
        component="main"
      >
        <Container maxWidth="lg">
          <Typography align="center" color="textPrimary" variant="h1">
            {statusCode}: {message}
          </Typography>
          {description && (
            <Typography sx={{ mt: 1 }} align="center" color="textSecondary" variant="subtitle2">
              {description}
            </Typography>
          )}
          {icon && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '100%',
                width: 400,
                mt: 6,
                mx: 'auto',
              }}
            >
              {icon}
            </Box>
          )}
          {action && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
              }}
            >
              {action}
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}

export default ErrorLayout
