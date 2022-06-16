import { useEffect } from 'react'
import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    message: [],
    show: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      showNotification (state, action) {
        const notification = action.payload
        const message = state.message.concat(notification)
        return {message, show:true}
      },
      removeNotification (state, action) {
        let show = true
        let message = [...state.message]
        message.shift()
        if(message.length === 0) show = false
        return {message, show}
      }
    }
})
  
export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = ( message, duration ) => {
  return async dispatch => {     
    setTimeout(() => {dispatch(removeNotification())},duration*1000)
    dispatch(showNotification(message))
  } 
}

export default notificationSlice.reducer