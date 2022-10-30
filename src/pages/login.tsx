import { NextPage } from 'next'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import z from 'zod'
import { loginUserSchema } from '@/server/schema/user.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import styled from '@emotion/styled'
import { trpc } from '@/utils/trpc'
import LoginBox from '@/components/styled/LoginBox'
import StyledCard from '@/components/styled/StyledCard'
import FlexColumnBox from '@/components/styled/FlexColumnBox'
import FlexRowBox from '@/components/styled/FlexRowBox'
import BackButton from '@/components/common/BackButton'
import { useNotification } from '@/hooks/useNotification'
import { addNotification } from '@/features/snackbar/snackbarSlice'
import { useAppDispatch } from '@/app/store'
import { getUserDetails } from '@/features/user/userActions'

type FieldValues = z.infer<typeof loginUserSchema>

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const router = useRouter()
  const { displayNotification } = useNotification()
  const dispatch = useAppDispatch()

  const loginUserMutation = trpc.auth.login.useMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {},
  })

  const submitForm: SubmitHandler<FieldValues> = (formData) => {
    loginUserMutation.mutate(formData, {
      onSuccess: async () => {
        displayNotification({ type: 'success', message: 'Login success!' })
        await dispatch(getUserDetails())
        if (window.history.state && window.history.state.idx > 0) {
          router.back()
        } else {
          router.push('/', '/', { shallow: true })
        }
      },
      onError: (error) => {
        displayNotification({ type: 'error', message: `Error:${error.message}` })
      },
    })
  }

  const handleRegisterClick = () => {
    router.push('/register', 'register', { shallow: true })
  }

  return (
    <LoginBox>
      <BackButton />
      <StyledCard>
        <Typography variant="h4" color="text.primary">
          Sign in
        </Typography>

        <form onSubmit={handleSubmit(submitForm)}>
          <FlexColumnBox>
            <TextField
              {...register('username')}
              label="Username"
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <FlexRowBox sx={{ mt: 4, justifyContent: 'space-between' }}>
              <Button onClick={handleRegisterClick} color="inherit">
                Register
              </Button>
              <Button type="submit" variant="contained">
                Log In
              </Button>
            </FlexRowBox>
          </FlexColumnBox>
        </form>
      </StyledCard>
    </LoginBox>
  )
}

export default LoginPage
