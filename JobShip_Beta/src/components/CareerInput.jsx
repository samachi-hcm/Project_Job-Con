import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ProfileTextInput from './ProfileTextInput'
import DeleteButton from './DeleteButton'
import NewCareerPage from '../pages/NewCareerPage'

import './css/CareerInput.css'

const CareerInput = ({ year,month,career }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='CareerInput'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <ProfileTextInput placeHolder={year.name} action={year}/>
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <ProfileTextInput placeHolder="12" action={month}/>
        </div>
        <p>月</p>
        <div className='DescriptionInput'>
          <ProfileTextInput placeHolder="経歴を入力" action={career} />
        </div>
      </div>
    </div>

  )
}

export default CareerInput