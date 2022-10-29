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

const BlueBox = styled(Box)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const PaddedCard = styled(Card)`
  padding: 16px;
`

const FlexColumnBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
`

type FieldValues = z.infer<typeof loginUserSchema>

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const router = useRouter()

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
    const { username, password } = formData
    loginUserMutation.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: () => {
          router.push('/')
        },
      },
    )
  }

  return (
    <BlueBox>
      <PaddedCard>
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
            <Button sx={{ mt: 4 }} type="submit" variant="contained">
              Log In
            </Button>
          </FlexColumnBox>
        </form>
      </PaddedCard>
    </BlueBox>
  )
}

export default LoginPage
