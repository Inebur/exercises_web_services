import React from 'react'

const NotificationSuccessUpdate = ({updatedName}) => {
    
    if (updatedName.success.length == 0) {
        return null
      }
    
      return (
        <div className='success'>
          {"Informations of " + updatedName.success + " has been updated succesfully on the server"}
        </div>
      )
}

export default NotificationSuccessUpdate