import React from 'react'

import Button from './Button'
import AccountPageInput from './AccountPageInput'

import './css/AccountCard_L.css'

const AccountCard_L = () => {
  return (
    <div className='AccountCard_L'>
      <div className='ContentsWrapper'>
        <div className='ContentsTitle'>
          <p>新しいアカウントを作って<br />はじめましょう</p>
        </div>
        <div className='MailAddressInput'>
          <AccountPageInput placeHolder="メールアドレス"/>
        </div>
        <div className='NameInput'>
          <AccountPageInput placeHolder="氏名"/>
        </div>
        <div className='PasswordInput'>
          <AccountPageInput placeHolder="パスワード"/>
        </div>
        <div className='Attention'>
          <p>アカウントに登録することにより<a href='#'>利用規約</a>及び<a href='#'>プライバシーポリシー</a>に同意したとみなします。</p>
        </div>
        <Button buttonRabel="SIGN UP" buttonAddress={"/NewProfilePage"}/>
        <div className='ToSignin'>
          <a href='#'>新規アカウント作成がお済みの方はこちら</a>
        </div>
      </div>
    </div>
  )
}

export default AccountCard_L