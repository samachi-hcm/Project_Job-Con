import React from 'react'
import Form from 'react-bootstrap/Form';

import './css/TextareaInput.css'

const TextareaInput = ({type,placeHolder,defaultValue,action,onChange,value}) => {
  return (
    <div className='TextareaInput'>
      <Form.Control as="textarea"  className='textbox' placeholder={placeHolder} defaultValue={defaultValue} {...action} value={value} onChange={onChange}/>
      
    </div>
  )
}

export default TextareaInput