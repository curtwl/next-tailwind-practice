import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editModal: null,
}

const editModalSlice = createSlice({
  name: 'editModal',
  initialState,
  reducers: {
    setEditModal: (state, action) => {
      state.editModal = action.payload
    },
    closeModal: (state) => {
      state.editModal = null
    },
  },
})

export const { setEditModal, closeModal } = editModalSlice.actions
export default editModalSlice.reducer
