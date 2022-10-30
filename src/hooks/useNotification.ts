import {
  addNotification,
  NotificationState,
  clearNotification as clearNotificationImport,
} from '@/features/snackbar/snackbarSlice'
import { useDispatch } from 'react-redux'

export const useNotification = () => {
  const dispatch = useDispatch()

  const displayNotification = (notification: NotificationState) => {
    dispatch(addNotification(notification))
  }

  const clearNotification = () => {
    dispatch(clearNotificationImport())
  }

  return { displayNotification, clearNotification } as const
}
