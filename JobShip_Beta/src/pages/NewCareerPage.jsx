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

  const [handleId, sethandleId] = useState(0)
  const addId = () => {
    sethandleId(handleId+1)
  }

  const [careerInputs, setCareerInputs] = useState([
    {id:handleId,value:<CareerInput id={handleId}/>},
    //オブジェクトではなく配列にすると動作する
])

  const addCareerInputs = () => {
    addId()
    setCareerInputs((prevs) => {
      return [...prevs, {id:handleId,value:(<CareerInput id={handleId}/>)}]
    })
  }

  const deleteCaeeerInputs = () => {
    setCareerInputs((prevs) => {
      return [...prevs,]
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
        {careerInputs.value}
        <AddButton onClick={addCareerInputs}/>
        <Button buttonRabel="次へ" />
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage