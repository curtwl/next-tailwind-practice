import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: null,
  token: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setLoggedInUser, setToken } = loginSlice.actions
export default loginSlice.reducer
