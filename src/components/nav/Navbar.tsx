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

const StyledNav = styled.div`
  background-color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  height: 64px;
  width: 100%;
`

interface Props {}

const Navbar: React.FC<Props> = () => {
  const router = useRouter()

  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const logoutMutation = trpc.auth.logout.useMutation()

  // automatically authenticate user if token is found
  useEffect(() => {
    const isLoggedIn = getCookie('logged_in')
    if (isLoggedIn) {
      dispatch(getUserDetails())
    } else dispatch(getAccessToken())
  }, [dispatch])

  const handleLogoutClick = () => {
    if (window.confirm('Confirm logout?')) {
      logoutMutation.mutate()
      dispatch(logout())
    }
  }

  const handleLoginClick = () => {
    router.push('/login', 'login', { shallow: true })
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
          <Box>
            {!isLoggedIn && (
              <Button onClick={handleLogoutClick} color="inherit">
                Register
              </Button>
            )}
            <Button onClick={isLoggedIn ? handleLogoutClick : handleLoginClick} variant="contained" color="inherit">
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </Button>
          </Box>
        )}
      </StyledNav>
    </>
  )
}

export default Navbar
