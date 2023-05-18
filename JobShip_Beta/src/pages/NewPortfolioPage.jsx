import React, { useState } from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import PortfolioInput from '../components/PortfolioInput'
import Button from '../components/RedirectButton'
import AddButton from '../components/AddButton'
//linked page

//styles
import './css/NewPortfolioPage.css'



const NewPortfolioPage = () => {

  const portfolioInput = {
    body:(<PortfolioInput />),
    flag:false
  }

  const [portfolioInputs, setPortfolioInputs] = useState([portfolioInput])
  
  const display = portfolioInputs.map((portfolioInput)=>portfolioInput.body)

  const addPortfolioInputs = () => {
    setPortfolioInputs((prevs) => {
      return [...prevs, portfolioInput]
    })
  }  

  return (
    <div className='NewPortfolioPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        {display}
        <AddButton onClick={addPortfolioInputs}/>
        <Button buttonRabel="次へ" />
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewPortfolioPage