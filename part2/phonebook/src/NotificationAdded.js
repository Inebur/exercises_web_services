import React from 'react'

const NotificationAdded = ({name}) => {
    
    if (name.length == 0) {
        return null
      }
    
      return (
        <div className='success'>
          {"Added " + name}
        </div>
      )
}

export default NotificationAdded