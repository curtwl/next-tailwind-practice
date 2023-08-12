import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './slices/loginSlice'
import editModalReducer from './slices/editModalSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    editModal: editModalReducer,
    notification: notificationReducer,
  },
})

export default store
