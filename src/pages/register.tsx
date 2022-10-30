import { NextPage } from 'next'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import z from 'zod'
import { createUserSchema, loginUserSchema } from '@/server/schema/user.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoginBox from '@/components/styled/LoginBox'
import StyledCard from '@/components/styled/StyledCard'
import FlexColumnBox from '@/components/styled/FlexColumnBox'
import RichTextEditor from '@/components/input/RichTextEditor'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import BackButton from '@/components/common/BackButton'
import { useNotification } from '@/hooks/useNotification'
import { getUserDetails } from '@/features/user/userActions'
import { sanitize } from '@/utils/sanitizeHtml'
import { trpc } from '@/utils/trpc'

type FieldValues = z.infer<typeof createUserSchema>

const RegisterPage: NextPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState<boolean>(false)
  const currentUser = useSelector((state: RootState) => state.user.userInfo)
  const { displayNotification } = useNotification()

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((prev) => !prev)

  const router = useRouter()

  const dispatch = useAppDispatch()

  const registerMutation = trpc.auth.register.useMutation()
  const loginMutation = trpc.auth.login.useMutation()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { username: '', password: '', passwordConfirm: '', userDetails: '', profileUrl: '' },
  })

  const submitForm: SubmitHandler<FieldValues> = (formData) => {
    formData.userDetails = sanitize(formData.userDetails)
    console.log(' formData.userDetails', formData.userDetails)
    registerMutation.mutate(formData, {
      onSuccess: () => {
        displayNotification({ type: 'success', message: 'Login success!' })
        if (!currentUser)
          loginMutation.mutate(formData, {
            onSuccess: async () => {
              await dispatch(getUserDetails())
              router.push('/', '/', { shallow: true })
            },
          })
        else router.push('/', '/', { shallow: true })
      },
      onError: (error) => {
        displayNotification({ type: 'error', message: `Error:${error.message}` })
      },
    })
  }

  return (
    <LoginBox>
      <BackButton />
      <StyledCard>
        <Typography variant="h4" color="text.primary">
          Create a profile
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
            <TextField
              sx={{ mt: 2 }}
              {...register('passwordConfirm')}
              type={showPasswordConfirm ? 'text' : 'password'}
              label="Password Confirmation"
              error={Boolean(errors.passwordConfirm)}
              helperText={errors.passwordConfirm?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle passwordConfirm visibility" onClick={handleClickShowPasswordConfirm}>
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              {...register('profileUrl')}
              label="Profile picture URL(external)"
              error={Boolean(errors.profileUrl)}
              helperText={errors.profileUrl?.message}
              fullWidth
            />
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1 }} variant="h6" color="text.primary">
                Profile details
              </Typography>
              <RichTextEditor
                name="userDetails"
                control={control}
                error={Boolean(errors.userDetails)}
                helperText={errors.userDetails?.message}
                config={{
                  placeholder: 'Add user details...',
                }}
              />
            </Box>

            <Button sx={{ mt: 4 }} type="submit" variant="contained">
              Register
            </Button>
          </FlexColumnBox>
        </form>
      </StyledCard>
    </LoginBox>
  )
}

export default RegisterPage
