import React from 'react'

import './css/RedirectButton.css'
import Button from 'react-bootstrap/Button';

const RedirectButton = ({buttonRabel,onClick}) => {
  return (
    <div className='RedirectButton'>
      <Button onClick={onClick} type='submit'>
        <p className='ButtonDescription'>{buttonRabel}</p>
      </Button>
    </div>
  )
}

export default RedirectButton