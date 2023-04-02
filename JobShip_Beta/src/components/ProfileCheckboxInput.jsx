import React from 'react'

import './css/ProfileCheckboxInput.css'

const ProfileCheckboxInput = ({type,placeHolder}) => {
  return (
    <div className='ProfileCheckboxInput'>
      <input type="checkbox" className='checkbox' placeholder={placeHolder}></input>
    </div>
  )
}

export default ProfileCheckboxInput