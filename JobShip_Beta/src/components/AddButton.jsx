import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const AddButton = ({onClick}) => {
  return (
    <div className='AddButton' style={{textAlign:"center"}}>
      <Button 
      onClick={onClick} 
      type='button' 
      style={{backgroundColor: 'black', borderRadius: '50%', width: '40px', height: '40px', textAlign: 'center', padding: 0, fontSize:"20px", lineHeight: '40px'}}
      >
        +
      </Button>
    </div>
  )
}

export default AddButton
