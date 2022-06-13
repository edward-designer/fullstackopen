import { useEffect } from 'react'

const Notification = ({message, setMessage}) => {
    useEffect(() => {
        const timeId = setTimeout(() => {
          setMessage(null)
        }, 3000)
        return () => {
          clearTimeout(timeId)
        }
    }, [message, setMessage])

    if(message?.type){
      if (message.type === 'success')
      return (
        <div className="border border-green-200 p-2 text-green-500">{message.message}</div>
      )
      return <div className="border border-red-200 p-2 text-red-500">{message.message}</div>
    }
}
export default Notification;