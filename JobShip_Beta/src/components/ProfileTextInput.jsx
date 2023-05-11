import React from 'react'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import CareerInput from './CareerInput';

import './css/ProfileTextInput.css'

const ProfileTextInput = ({ type, placeHolder, action, defaultvalue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='ProfileTextInput'>
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


export default ProfileTextInput