import React from 'react'

import './css/ContestContent.css'

const imgAdress = "../../public/Contest_Logo.png"

const ContestContent = () => {
  return (
    <div className='ContestContent'>
        <img src={imgAdress}></img>
        <div className='ContestText'>
          <p className='ContestTitle'>Z世代のためのプレゼンコンテスト</p>
          <p className='ContestPresents'>主催　株式会社白昼夢</p>
          <p className='ContestDescription'>サンプル</p>
        </div>
    </div>
  )
}

export default ContestContent