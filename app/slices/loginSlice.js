import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
  },
})

export const { setLoggedInUser } = loginSlice.actions
export default loginSlice.reducer
