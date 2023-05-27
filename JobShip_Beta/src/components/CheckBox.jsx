import React from 'react'
import { FormCheck, Form } from 'react-bootstrap';

const CheckBox = ({ label, action, checked }) => {
  return (

    <FormCheck
      type="checkbox"
      label={label}
      value={label}
      {...action}
      defaultChecked={checked}
    />
  )
}

export default CheckBox