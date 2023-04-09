import React from 'react'

import './css/Button.css'

const Button = ({buttonRabel,onClick}) => {
  return (
    <div className='Button'>
      <button type='submit' className="ButtonBlack" onClick={onClick}>
        <p className='ButtonDescription'>{buttonRabel}</p>
      </button>
    </div>
  )
}

export default Button