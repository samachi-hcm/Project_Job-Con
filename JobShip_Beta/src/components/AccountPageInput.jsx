import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import AccountCard_L from './AccountCard_L';
import './css/AccountPageInput.css'



const AccountPageInput = ({ placeHolder, test, setTest }) => {

  return (
    <div className='AccountPageInput'>

      <input
        type="text"
        className='textbox'
        placeholder={placeHolder}
        id={placeHolder}
        onChange={(Event) => setTest(
          [...test, Event.target.value]
        )}
      />
    </div>
  )
}

export default AccountPageInput