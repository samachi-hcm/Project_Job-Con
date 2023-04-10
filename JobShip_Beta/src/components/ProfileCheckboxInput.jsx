import React from 'react'

import './css/ProfileCheckboxInput.css'

const ProfileCheckboxInput = ({label}) => {
  return (
    <div className='ProfileCheckboxInput'>
      <label>
        <input type="checkbox" className='checkbox' id={label}></input>
        <p>{label}</p>
      </label>

    </div>
  )
}

export default ProfileCheckboxInput