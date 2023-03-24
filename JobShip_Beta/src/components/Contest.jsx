import React from 'react'
import ContestContents from './ContestContent'

import './css/Contest.css'


const Contest = () => {
  return (
    <div className='Contest'>
      <div className='Title'>
        開催中のコンテスト
      </div>
      <div className='Contents'>
        <ContestContents/>
        <ContestContents/>
        <ContestContents/>
        <p className='ContestReqruitment'>ジョブコンでコンテストを主催をしたい方はこちら</p>
      </div>
    </div>
  )
}

export default Contest