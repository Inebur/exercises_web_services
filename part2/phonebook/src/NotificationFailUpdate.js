import React from 'react'

const NotificationFailUpdate = ({updatedName}) => {
    
    if (updatedName.fail.length == 0) {
        return null
      }
    
      return (
        <div className='fail'>
          {"Informations of " + updatedName.fail + " has already been removed from the server"}
        </div>
      )
}

export default NotificationFailUpdate