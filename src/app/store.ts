import { snackbarReducer } from '@/features/snackbar/snackbarSlice'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
