import React from 'react'

import './css/Button.css'

const Button = ({buttonRabel,buttonAddress}) => {
  return (
    <div className='Button'>
      <a href={buttonAddress} class="ButtonBlack">
        <p className='ButtonDescription'>{buttonRabel}</p>
      </a>
    </div>
  )
}

export default Button