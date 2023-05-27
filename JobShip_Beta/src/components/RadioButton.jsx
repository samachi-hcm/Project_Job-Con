import React from 'react'
import { FormCheck, Button } from 'react-bootstrap';


const RadioButton = ({ label,action,checked }) => {
  return (
   
      <FormCheck
        type="radio"
        name="options-outlined"
        label={label}
        value={label}
        {...action}
        defaultChecked={checked}
        style={{display:"inline-block"}}
      />
    
  )
}

export default RadioButton