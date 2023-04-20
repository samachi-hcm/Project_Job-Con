import React from 'react'
import { useState } from 'react'

import ProfileTextInput from './ProfileTextInput'
import DeleteButton from './DeleteButton'
import NewCareerPage from '../pages/NewCareerPage'

import './css/CareerInput.css'

const CareerInput = ({ onClick }) => {

  return (
    <div className='CareerInput'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <ProfileTextInput placeHolder="2022" />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <ProfileTextInput placeHolder="12" />
        </div>
        <p>月</p>
        <DeleteButton onClick = {onClick}/>
        <div className='DescriptionInput'>
          <ProfileTextInput placeHolder="経歴を入力" />
        </div>
      </div>
    </div>

  )
}

export default CareerInput