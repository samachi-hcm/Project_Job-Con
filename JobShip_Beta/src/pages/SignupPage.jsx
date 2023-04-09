import React from 'react'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'
import AccountCard_L from '../components/AccountCard_L'
import AccountCard_R from '../components/AccountCard_R'

//linked page

//styles
import './css/SignupPage.css'

const SignupPage = () => {
  const attention = (
    <p>アカウントに登録することにより<a href='#'>利用規約</a>及び<a href='#'>プライバシーポリシー</a>に同意したとみなします。</p>
    )

  return (
    <div className='SignUpPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='MainWrapper'>
        <div className='AccountCardWrapper'>
          <AccountCard_L  
            contentsDescription1 = "新しいアカウントを作って" 
            contentsDescription2 = "はじめましょう"
            attention={attention}
            buttonRabel="Sign Up"
            buttonAddress="#"
            toOtherPage1="新規アカウント作成がお済みの方はこちら"
            toOtherPage2={null}
          />
          <AccountCard_R />
        </div>
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default SignupPage