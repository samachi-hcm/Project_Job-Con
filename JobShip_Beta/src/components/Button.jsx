import React from 'react'

import './css/Button.css'

const Button = ({buttonRabel}) => {
  return (
    <div className='Button'>
      <a href="" class="ButtonBlack">
        <p className='ButtonDescription'>{buttonRabel}</p>
      </a>
    </div>
  )
}

export default Button