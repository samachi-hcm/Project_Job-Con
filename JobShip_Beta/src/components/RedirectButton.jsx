import React from 'react'

import './css/RedirectButton.css'
import Button from 'react-bootstrap/Button';

const RedirectButton = ({buttonRabel,onClick,type,disabled,name}) => {
  return (
    <div className='RedirectButton'>
      <Button onClick={onClick} type={type} disabled={disabled} name={name}>
        {buttonRabel}
      </Button>
    </div>
  )
}

export default RedirectButton