import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    getUsers(state, action) {
      return action.payload
    },
  },
})

export const { getUsers } = userSlice.actions

export const getUsersList = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAllUsers()
    return dispatch(getUsers(allUsers))
  }
}

export default userSlice.reducer
