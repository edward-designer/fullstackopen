import { configureStore } from '@reduxjs/toolkit'

import bloglistReducer from './reducers/bloglistSlice'
import notificationReducer from './reducers/notificationSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
  reducer: {
    bloglist: bloglistReducer,
    notification: notificationReducer,
    users: userReducer,
  },
})

export default store
