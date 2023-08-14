import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../app/slices/notificationSlice'

const Notification = () => {
  const dispatch = useDispatch()
  const editModal = useSelector(state => state.notification.notificationMessage)
  const notificationMessage = useSelector(state => state.notification.notificationMessage)

  useEffect(() => {
    setTimeout(() => dispatch(clearNotification()), 6000)
  }, [])

    if (notificationMessage.message === '') {
      return null
    }
    else if (notificationMessage.type === 'success') {
        console.log('test success')
      return (
        <div className="w-auto lg:w-1/2 h-1/100 fixed bottom-0 left-0 right-0 mx-auto p-6 bg-white border border-black rounded-tl-10 rounded-tr-10">
            ✅ {notificationMessage.message}</div>
      )
    }
    else {
      return (
        <div className="w-auto h-1/100 fixed bottom-0 left-0 right-0 mx-auto p-6 bg-white border border-black rounded-tl-10 rounded-tr-10">
            ❌ {notificationMessage.message}</div>
      )
       
    }
  }
  
  export default Notification