//テンプレートver0.1 2023/03/30

import React from 'react'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'

//linked page

//styles
import './css/Template.css'

const Template = () => {
  return (
    <div className='Template'>
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

export default Template