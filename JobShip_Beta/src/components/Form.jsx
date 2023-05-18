import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import TextInput from './TextInput'
import DeleteButton from './DeleteButton'
import NewCareerPage from './Forms'

import './css/Form.css'

const Form = ({ year, month, description, savedData, mode }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div className='Form'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <TextInput placeHolder={year.name} action={year} defaultvalue={savedData?.year} />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <TextInput placeHolder="12" action={month} defaultvalue={savedData?.month} />
        </div>
        <p>月</p>
        <div className='DescriptionInput'>
          <TextInput placeHolder="経歴を入力" action={description} defaultvalue={savedData?.description} />
        </div>
      </div>
      {console.log(savedData)}
    </div>
  )
}


export default Form