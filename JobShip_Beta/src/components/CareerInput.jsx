import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ProfileTextInput from './ProfileTextInput'
import DeleteButton from './DeleteButton'
import NewCareerPage from '../pages/NewCareerPage'

import './css/CareerInput.css'

const CareerInput = ({ year, month, career, savedCareer }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div className='CareerInput'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <ProfileTextInput placeHolder={year.name} action={year} defaultvalue={savedCareer?.year} />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <ProfileTextInput placeHolder="12" action={month} defaultvalue={savedCareer?.month} />
        </div>
        <p>月</p>
        <div className='DescriptionInput'>
          <ProfileTextInput placeHolder="経歴を入力" action={career} defaultvalue={savedCareer?.career} />
        </div>
      </div>
      {console.log(savedCareer)}
    </div>
  )
}


export default CareerInput