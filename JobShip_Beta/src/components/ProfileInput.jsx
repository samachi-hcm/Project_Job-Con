import React from 'react'


import ProfileCheckboxInput from './ProfileCheckboxInput'
import ProfileImageInput from './ProfileImageInput'
import TextInput from './TextInput'
import Button from './RedirectButton'


import './css/ProfileInput.css'

const ProfileInput = () => {
  return (
    <div className='ProfileInput'>
      <div className='InputWrapper'>
        <div className='ImageInputWrapper'>
          <ProfileImageInput />
        </div>
        <div className='NameInputWrapper'>
          <div className='NameInputL'>
            <TextInput placeHolder="姓" />
            <TextInput placeHolder="Family Name" />
          </div>
          <div className='NameInputR'>
            <TextInput placeHolder="名" />
            <TextInput placeHolder="First Name" />
          </div>
          <div className='CheckboxWrapper'>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label="営業"/>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "企画" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "人事" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "広報" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "コンサル" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "財務" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "法務" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "エンジニア" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "デザイナー" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "タレント" />
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "クリエイター" />

            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput label = "その他" />
            </div>

          </div>
        </div>
        <div className='AddressInputWrapper'>
          <TextInput placeHolder="Gmail URL(任意)" />
          <TextInput placeHolder="Twitter URL(任意)" />
          <TextInput placeHolder="Facebook URL(任意)" />
          <TextInput placeHolder="Instagram URL(任意)" />
        </div>
      </div>
    </div>
  )
}

export default ProfileInput