import React, { useState } from 'react'
import Button from './RedirectButton'

import './css/AddButton.css'



const AddButton = ({onClick}) => {
  
  return (
    <div className='AddButton'>
      <button className="ButtonAdd" onClick={onClick} type='button'>
        <p className='ButtonDescription'>+</p>
      </button>
    </div>
  )
}

export default AddButton