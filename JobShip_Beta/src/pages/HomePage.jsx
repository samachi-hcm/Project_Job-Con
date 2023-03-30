import React from 'react'
import { Routes, Route } from 'react-router-dom'

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'

//linked pages
import NewCarrerPage from './NewCareerPage'

//styles
import './css/HomePage.css'

const HomePage = () => {
  return (
    <div className='HomePage'>
      
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <div className='MainWrapper'>
        <News />
        <div className='P_SWrapper'>
          <PortfolioButton />
          <SuggestButton />
        </div>
        <Contest />
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
      
    </div>


  )
}

export default HomePage