import React from 'react'

import './css/RedirectButton.css'
import Button from 'react-bootstrap/Button';

const RedirectButton = ({buttonRabel,onClick,type}) => {
  return (
    <div className='RedirectButton'>
      <Button onClick={onClick} type={type}>
        {buttonRabel}
      </Button>
    </div>
  )
}

export default RedirectButton