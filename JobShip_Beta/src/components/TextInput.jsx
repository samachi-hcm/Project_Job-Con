import React from 'react'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import CareerInput from './Form';

import './css/TextInput.css'

const TextInput = ({ type, placeHolder, action, defaultvalue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='TextInput'>
      <input
        defaultValue={defaultvalue}
        {...action}
        type={type}
        className='textbox'
        placeholder={placeHolder}
      ></input>
    </div>
  )
}


export default TextInput