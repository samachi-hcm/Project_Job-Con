import React from 'react'
import { FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Form from './Form';

import './css/TextInput.css'

const TextInput = ({ type, placeHolder, action, defaultValue, style, error }) => {

  return (
    <div className='TextInput'>
      <FormControl
        defaultValue={defaultValue}
        {...action}
        className='textbox'
        placeholder={placeHolder}
        style={style}
      ></FormControl>
      {error && <p style={{color: 'red',fontSize:"12px",margin:"0"}}>{error.message}{console.log(error.message)}</p>}
      
    </div>
  )
}


export default TextInput