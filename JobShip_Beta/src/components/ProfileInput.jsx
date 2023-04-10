import React from 'react'


import ProfileCheckboxInput from './ProfileCheckboxInput'
import ProfileImageInput from './ProfileImageInput'
import ProfileTextInput from './ProfileTextInput'
import Button from './Button'


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
            <ProfileTextInput placeHolder="姓" />
            <ProfileTextInput placeHolder="Family Name" />
          </div>
          <div className='NameInputR'>
            <ProfileTextInput placeHolder="名" />
            <ProfileTextInput placeHolder="First Name" />
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
          <ProfileTextInput placeHolder="Gmail URL(任意)" />
          <ProfileTextInput placeHolder="Twitter URL(任意)" />
          <ProfileTextInput placeHolder="Facebook URL(任意)" />
          <ProfileTextInput placeHolder="Instagram URL(任意)" />
        </div>
      </div>

      <Button buttonRabel="次へ" buttonAddress="/NewCareerPage" />
    </div>
  )
}

export default ProfileInput