import React from 'react'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import './css/ProfileTextInput.css'

const ProfileTextInput = ({type,placeHolder,action}) => {
  return (
    <div className='ProfileTextInput'>
      <input 
      {...action}
      type={type} 
      className='textbox' 
      placeholder={placeHolder}>
      </input>
    </div>
  )
}

export default ProfileTextInput