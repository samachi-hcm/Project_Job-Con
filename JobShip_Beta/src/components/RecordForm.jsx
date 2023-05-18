import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import TextInput from './TextInput'
import DeleteButton from './DeleteButton'

import './css/Form.css'

const RecordForm = ({ year, month, record, savedRecord }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div className='Form'>
      <div className='InputWrapper'>
        <div className='test'>
        </div>
        <div className='EraInput'>
          <TextInput placeHolder={year.name} action={year} defaultvalue={savedRecord?.year} />
        </div>
        <p>年</p>
        <div className='MonthInput'>
          <TextInput placeHolder="12" action={month} defaultvalue={savedRecord?.month} />
        </div>
        <p>月</p>
        <div className='DescriptionInput'>
          <TextInput placeHolder="実績を入力" action={record} defaultvalue={savedRecord?.record} />
        </div>
      </div>
      {console.log(savedRecord)}
    </div>
  )
}

export default RecordForm
