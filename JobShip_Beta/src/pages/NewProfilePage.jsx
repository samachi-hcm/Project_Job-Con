import React from 'react'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'

//linked page

//styles
import './css/NewProfilePage.css'

const NewProfilePage = () => {
  return (
    <div className='NewProfilePage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <div className='MainWrapper'>
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewProfilePage