import { createSlice } from '@reduxjs/toolkit'
import { CookieValueTypes, getCookie, getCookies, setCookie } from 'cookies-next'
import Error from 'next/error'
import { z } from 'zod'
import { getAccessToken, getUserDetails } from './userActions'
import { Prisma } from '@prisma/client'
import { getMeHandler } from '@/server/controllers/user.controller'

// initialize userToken from local storage
const accessToken = getCookie('access_token')

type InitialState = {
  loading: boolean
  userInfo: ReturnType<typeof getMeHandler>['data']['user'] | null
  accessToken?: CookieValueTypes
  error: null | Error
  success: boolean
}

const initialState: InitialState = {
  loading: true,
  userInfo: null,
  accessToken,
  error: null,
  success: false,
}

console.log('getCookie(access_token)', getCookies())
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false
      state.userInfo = null
      state.accessToken = null
      state.error = null
    },
  },
  extraReducers: {
    // get user details
    [String(getUserDetails.pending)]: (state) => {
      state.loading = true
    },
    [String(getUserDetails.fulfilled)]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.result.data.data.user
    },
    [String(getUserDetails.rejected)]: (state, { payload }) => {
      state.loading = false
    },
    [String(getAccessToken.pending)]: (state) => {},
    [String(getAccessToken.fulfilled)]: (state, { payload }) => {
      state.accessToken = payload.result.data.access_token
    },
    [String(getAccessToken.rejected)]: (state, { payload }) => {},
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
