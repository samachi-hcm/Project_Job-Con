import React from 'react'
import { FormCheck, Button } from 'react-bootstrap';

import './css/ProfileCheckboxInput.css'

const ProfileCheckboxInput = ({label}) => {
  return (
    <div className='ProfileCheckboxInput'>
      <FormCheck
        type="radio"
        id={label}
        name="options-outlined"
        label={
          <Button variant="outline-danger" htmlFor="danger-outlined">
            Danger radio
          </Button>
        }
      />
    </div>
  )
}

export default ProfileCheckboxInput