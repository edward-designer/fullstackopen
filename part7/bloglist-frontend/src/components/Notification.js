import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearNotification } from '../reducers/notificationSlice'

let timeId

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)

  useEffect(() => {
    timeId = setTimeout(() => {
      dispatch(clearNotification(null))
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [message, clearNotification])

  if (message !== null) {
    if (message.type === 'success')
      return (
        <div className="border border-green-200 p-2 text-green-500">
          {message.message}
        </div>
      )
    return (
      <div className="border border-red-200 p-2 text-red-500">
        {message.message}
      </div>
    )
  }
}
export default Notification
