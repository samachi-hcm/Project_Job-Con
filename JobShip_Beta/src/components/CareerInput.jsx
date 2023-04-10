import React from 'react'

import ProfileTextInput from './ProfileTextInput'
import DeleteButton from './DeleteButton'

import './css/CareerInput.css'

const CareerInput = ({ id }) => {
  return (
    <div className='CareerInput'>
      <div className='InputWrapper'>
        <div className='test'>
          {id}
        </div>
        <div className='EraInput'>
          <ProfileTextInput placeHolder="2022" />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <ProfileTextInput placeHolder="12" />
        </div>
        <p>月</p>
        <DeleteButton />
        <div className='DescriptionInput'>
          <ProfileTextInput placeHolder="経歴を入力" />
        </div>
      </div>
    </div>
  )
}

export default CareerInput