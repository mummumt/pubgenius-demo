import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

export const getUserDetails = createAsyncThunk('user/getUserDetails', async (arg, { rejectWithValue }) => {
  try {
    // get user data from store
    const { data } = await axios.get(`/api/trpc/user.me`)
    return data
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

export const getAccessToken = createAsyncThunk('user/getAccessToken', async (arg, { rejectWithValue }) => {
  try {
    // get access token from refresh token
    const { data } = await axios.get(`/api/trpc/auth.refresh`)
    return data
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})
