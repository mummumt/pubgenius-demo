import { getAccessToken, getUserDetails } from '@/features/user/userActions'
import { logout } from '@/features/user/userSlice'
import { trpc } from '@/utils/trpc'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Button, Card, CardActionArea, CircularProgress, IconButton, Popover, Typography } from '@mui/material'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'

const StyledNav = styled(Box)`
  background-color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  height: 64px;
  width: 100%;
`

const FlexEndBox = styled(Box)`
  background-color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  min-width: 200px;
`

interface Props {}

const Navbar: React.FC<Props> = () => {
  const router = useRouter()

  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const logoutMutation = trpc.auth.logout.useMutation()
  const deleteMutation = trpc.auth.delete.useMutation()

  // automatically authenticate user if token is found
  useEffect(() => {
    const isLoggedIn = getCookie('logged_in')
    if (isLoggedIn) {
      dispatch(getUserDetails())
    } else dispatch(getAccessToken())
  }, [dispatch])

  const handleLogoutClick = () => {
    if (window.confirm('Confirm logout?')) {
      logoutMutation.mutate(undefined, {
        onSuccess: () => dispatch(logout()),
      })
    }
  }

  const handleDeleteClick = () => {
    if (window.confirm('Confirm delete?')) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => dispatch(logout()),
      })
    }
  }

  const handleLoginClick = () => {
    router.push('/login', 'login', { shallow: true })
  }

  const handleRegisterClick = () => {
    router.push('/register', 'register', { shallow: true })
  }

  const isLoggedIn = Boolean(userState.userInfo)
  const isLoading = userState.loading
  const userName = userState.userInfo?.username
  return (
    <>
      <StyledNav>
        <Typography variant="h5" color="primary.contrastText">
          Welcome, {isLoading ? '' : isLoggedIn ? userName : 'Guest'}
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <FlexEndBox>
            {!isLoggedIn ? (
              <>
                <Button onClick={handleRegisterClick} color="inherit">
                  Register
                </Button>
                <Button onClick={handleLoginClick} variant="contained" color="inherit">
                  Log In
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleLogoutClick} variant="contained" color="inherit">
                  Log Out
                </Button>
                <Button sx={{ ml: 2 }} onClick={handleDeleteClick} variant="contained" color="secondary">
                  Delete
                </Button>
              </>
            )}
          </FlexEndBox>
        )}
      </StyledNav>
    </>
  )
}

export default Navbar
