import React from 'react'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'
import AccountCard_L from '../components/AccountCard_L'
import AccountCard_R from '../components/AccountCard_R'

//linked page

//styles
import './css/SigninPage.css'

const SigninPage = () => {
  return (
    <div className='SigninPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='MainWrapper'>
        <div className='AccountCardWrapper'>
          <AccountCard_L 
            contentsDescription1="サインイン"
            contentsDescription2={null}
            attention = {null}
            buttonRabel="Sign In"
            nextAddress="/SignupPage"
            toOtherPage1="無料で会員登録はこちら"
            toOtherPage2="パスワードを忘れた方はこちら"
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

export default SigninPage