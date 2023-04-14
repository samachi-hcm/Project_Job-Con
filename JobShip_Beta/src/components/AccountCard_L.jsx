import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from './Button'
import AccountPageInput from './AccountPageInput'

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
 
  const onSubmit = () => {
    console.log(test)
  }

  const [test, setTest] = useState([])
  
  return (
    <div className='AccountCard_L'>
      <div className='ContentsWrapper'>
        <form action={nextAddress} onSubmit={onSubmit}>
          <div className='ContentsTitle'>
            <p>{contentsDescription1}<br />{contentsDescription2}</p>
          </div>
          <div className='MailAddressInput'>
            <AccountPageInput placeHolder="メールアドレス" test = {test} setTest={setTest}/>
          </div>
          <div className='NameInput'>
            <AccountPageInput placeHolder="氏名" test = {test} setTest={setTest}/>
          </div>
          <div className='PasswordInput'>
            <AccountPageInput placeHolder="パスワード" setTest={setTest}/>
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