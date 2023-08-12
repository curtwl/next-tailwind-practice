import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notificationMessage: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload
    },
    clearNotification: (state) => {
      state.notificationMessage = ''
    },
  },
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
