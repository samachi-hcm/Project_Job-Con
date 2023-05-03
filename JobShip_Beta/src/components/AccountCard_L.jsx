import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from './Button'
import AccountPageInput from './AccountPageInput'

import { db } from '../Firebase';
import { collection, getFirestore, addDoc } from 'firebase/firestore';


import './css/AccountCard_L.css'

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
  const onSubmit = (data) => {
    setUserData(data)
    console.log(userData["mailAddress"])
    console.log(errors);
    addDoc(collection(db,"test"),userData)
  }

  const [test, setTest] = useState([])
  
  return (
    <div className='AccountCard_L'>
      <div className='ContentsWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='ContentsTitle'>
            <p>{contentsDescription1}<br />{contentsDescription2}</p>
          </div>
          <div className='MailAddressInput'>
            <AccountPageInput placeHolder="メールアドレス" action={register("mailAddress", {required: true})}/>
          </div>
          <div className='NameInput'>
            <AccountPageInput placeHolder="氏名" action={register("name")}/>
          </div>
          <div className='PasswordInput'>
            <AccountPageInput placeHolder="パスワード" action={register("password")}/>
          </div>
          <div className='Attention'>
            {attention}
          </div>
          <Button buttonRabel={buttonRabel} />
        </form>
        <div className='ToSignin'>
          <a href='#'>{toOtherPage1}</a>
          <a href='#'>{toOtherPage2}</a>
        </div>
      </div>
    </div>
  )
}

export default AccountCard_L