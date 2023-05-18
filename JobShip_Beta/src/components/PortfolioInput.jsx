import React from 'react'
import { useState } from 'react'

import TextInput from './TextInput'
import DeleteButton from './DeleteButton'
import TextareaInput from './TextareaInput'
import NewPortfolioPage from '../pages/NewPortfolioPage'

import './css/PortfolioInput.css'

const PortfolioInput = ({ onClick }) => {

  return (
    <div className='PortfolioInput'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <TextInput placeHolder="2022" />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <TextInput placeHolder="12" />
        </div>
        <p>月</p>
        <DeleteButton onClick = {onClick}/>
        <div className='DescriptionInput'>
          <TextInput placeHolder="経歴を入力" />
        </div>
        <div className='DetailInput'>
          <TextareaInput />
        </div>
      </div>
    </div>
  )
}

export default PortfolioInput