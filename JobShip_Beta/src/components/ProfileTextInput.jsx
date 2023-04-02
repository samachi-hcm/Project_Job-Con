import React from 'react'

import './css/ProfileTextInput.css'

const ProfileTextInput = ({type,placeHolder}) => {
  return (
    <div className='ProfileTextInput'>
      <input type={type} className='textbox' placeholder={placeHolder}></input>
    </div>
  )
}

export default ProfileTextInput