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
              <ProfileCheckboxInput />
              <p>営業</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>企画</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>人事</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>広報</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>コンサル</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>財務</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>法務</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>エンジニア</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>デザイナー</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>タレント</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>クリエイター</p>
            </div>
            <div className='Checkboxes'>
              <ProfileCheckboxInput />
              <p>その他</p>
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

      <Button buttonRabel="次へ" buttonAddress="#" />
    </div>
  )
}

export default ProfileInput