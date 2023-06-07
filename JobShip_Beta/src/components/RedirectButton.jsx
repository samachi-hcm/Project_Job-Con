import React from 'react'

import './css/RedirectButton.css'
import Button from 'react-bootstrap/Button';

const RedirectButton = ({buttonRabel,onClick,type,disabled}) => {
  return (
    <div className='RedirectButton'>
      <Button onClick={onClick} type={type} disabled={disabled}>
        {buttonRabel}
      </Button>
    </div>
  )
}

export default RedirectButton