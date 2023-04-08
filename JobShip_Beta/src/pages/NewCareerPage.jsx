import React from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import CareerInput from '../components/CareerInput'
import Button from '../components/Button'
//linked page

//styles
import './css/NewCarrerPage.css'



const NewCareerPage = () => {
  return (
    <div className='NewCarrerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        <CareerInput />
        <Button buttonRabel="次へ"/>
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage