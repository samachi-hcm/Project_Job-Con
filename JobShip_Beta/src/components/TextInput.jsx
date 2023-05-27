import React from 'react'
import { FormControl } from 'react-bootstrap';


import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Form from './Form';

import './css/TextInput.css'

const TextInput = ({ type, placeHolder, action, defaultValue, style }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='TextInput'>
      <FormControl
        defaultValue={defaultValue}
        {...action}
        className='textbox'
        placeholder={placeHolder}
        style={style}
      ></FormControl>
      
    </div>
  )
}


export default TextInput