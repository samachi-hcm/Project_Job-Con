import React from 'react'

import ProfileTextInput from './ProfileTextInput'

import './css/CareerInput.css'

const CareerInput = () => {
  return (
    <div className='CareerInput'>
      <div className='InputWrapper'>
        <div className='EraInput'>
          <ProfileTextInput placeHolder="2022"/>
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <ProfileTextInput placeHolder="12" />
        </div>
        <p>月</p>
         <div className='DescriptionInput'>
          <ProfileTextInput placeHolder="経歴を入力" />
         </div>
      </div>
    </div>
  )
}

export default CareerInput