import React from 'react'

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'

//linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'

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
          <a href='/NewProfilePage'>
            <PortfolioButton />
          </a>
          
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