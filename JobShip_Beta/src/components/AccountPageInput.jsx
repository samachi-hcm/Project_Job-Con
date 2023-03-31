import React from 'react'

import './css/AccountPageInput.css'

const AccountPageInput = ({type,placeHolder}) => {
  return (
    <div className='AccountPageInput'>
      <input type={type} className='textbox' placeholder={placeHolder}></input>
    </div>
  )
}

export default AccountPageInput