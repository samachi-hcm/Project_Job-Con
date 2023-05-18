import React, { useState } from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import Form from '../components/Form'
import Button from '../components/RedirectButton'
import AddButton from '../components/AddButton'
import DeleteButton from '../components/DeleteButton'
//linked page

//styles
import './css/RePage.css'

const RePage = () => {
  return (
    <div className='RePage'>
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

export default RePage