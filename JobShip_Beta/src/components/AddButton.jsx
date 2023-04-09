import React, { useState } from 'react'
import Button from './Button'

import './css/AddButton.css'



const AddButton = ({onClick}) => {
  
  return (
    <div className='AddButton'>
      <button className="ButtonAdd" onClick={onClick}>
        <p className='ButtonDescription'>+</p>
      </button>
    </div>
  )
}

export default AddButton