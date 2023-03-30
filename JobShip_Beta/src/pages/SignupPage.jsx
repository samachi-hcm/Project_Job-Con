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
  return (
    <div className='SignUpPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='MainWrapper'>
        <div className='AccountCardWrapper'>
          <AccountCard_L />
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