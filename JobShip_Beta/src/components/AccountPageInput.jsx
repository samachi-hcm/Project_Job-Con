import React from 'react'
import { useForm } from 'react-hook-form';
import './css/AccountPageInput.css'



const AccountPageInput = ({type,placeHolder}) => {

  const {
  register, 
  handleSubmit, 
  formState:{errors}
  } = useForm();

  return (
    <div className='AccountPageInput'>
      <input type={type} className='textbox' placeholder={placeHolder} id = "test" {...register("test")}></input>
    </div>
  )
}

export default AccountPageInput