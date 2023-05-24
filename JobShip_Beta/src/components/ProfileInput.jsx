import React from 'react'

import ProfileCheckboxInput from './ProfileCheckboxInput'
import ProfileImageInput from './ProfileImageInput'
import TextInput from './TextInput'
import Button from './RedirectButton'


import './css/ProfileInput.css'

const ProfileInput = ({ familyName, firstName, familyNameE, firstNameE, savedData }) => {
  return (
    <div className='ProfileInput'>
      <div className='InputWrapper'>
        <div className='NameInputWrapper'>
          <TextInput placeHolder="姓" action={familyName} defaultvalue={savedData?.familyName} />
          <TextInput placeHolder="名" action={firstName} defaultvalue={savedData?.firstName} />
          <TextInput placeHolder="family name" action={familyNameE} defaultvalue={savedData?.familyNameE} />
          <TextInput placeHolder="first name" action={firstNameE} defaultvalue={savedData?.firstNameE} />
        </div>
      </div>
    </div>
  )
}

export default ProfileInput