import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import AccountCard_L from './AccountCard_L';
import './css/AccountPageInput.css'



const AccountPageInput = ({ placeHolder, action }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='AccountPageInput'>

      <input
        {...action}
        type="text"
        className='textbox'
        placeholder={placeHolder}
        id={placeHolder}
      />
    </div>
  )
}

export default AccountPageInput