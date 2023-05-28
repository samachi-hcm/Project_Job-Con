import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from './RedirectButton'
import AccountPageInput from './AccountPageInput'

import { db } from '../Firebase';
import { collection, getFirestore, addDoc } from 'firebase/firestore';


import './css/AccountCard_L.css'
import GoogleButton from './GoogleButton';

const AccountCard_L = ({
  contentsDescription1,
  contentsDescription2,
  attention,
  buttonRabel,
  nextAddress,
  toOtherPage1,
  toOtherPage2 }) => 
  {
 
  const [userData, setUserData] = useState()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [test, setTest] = useState([])
  
  return (
    <div className='AccountCard_L'>
      <div className='ContentsWrapper'>
          <div className='ContentsTitle'>
            <p>ログインまたは新規登録</p>
          </div>

            <GoogleButton />
          
          <div className='Attention'>
            {attention}
          </div>
      </div>
    </div>
  )
}

export default AccountCard_L