//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(props.notification.show){
    return (
      <>
        {props.notification.message.map(message => <div style={style} >{message}</div>)}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}  

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification