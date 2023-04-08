import React from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import ProfileInput from '../components/ProfileInput'
//linked page

//styles
import './css/NewProfilePage.css'

const NewProfilePage = () => {
  return (
    <div className='NewProfilePage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        <ProfileInput />
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewProfilePage