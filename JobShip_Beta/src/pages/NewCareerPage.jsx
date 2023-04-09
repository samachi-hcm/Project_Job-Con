import React, { useState } from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import CareerInput from '../components/CareerInput'
import Button from '../components/Button'
import AddButton from '../components/AddButton'
//linked page

//styles
import './css/NewCarrerPage.css'



const NewCareerPage = () => {

  const [addCareerInput, setaddCareerInput] = useState([<CareerInput />, <CareerInput />])

  const handleAddCareerInput = () => {
    setaddCareerInput((prevs) => {
      return [...prevs, (<CareerInput />)]
    })
  }

  return (
    <div className='NewCareerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        {addCareerInput}
        <AddButton buttonRabel="次へ" onClick={handleAddCareerInput}/>
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage