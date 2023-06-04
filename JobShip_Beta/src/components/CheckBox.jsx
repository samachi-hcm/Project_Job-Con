import React from 'react'
import { FormCheck, Form } from 'react-bootstrap';

const CheckBox = ({ label, action, checked, defaultChecked, onChange }) => {
  return (

    <FormCheck
      type="checkbox"
      label={label}
      value={label}
      {...action}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={onChange}
    />
  )
}

export default CheckBox