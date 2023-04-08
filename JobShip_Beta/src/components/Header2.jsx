import React from 'react'

import './css/Header2.css'

const Header2 = () => {
  return (
    <div className='Header2'>
      <div className='Numbers'>
        <div className='Number1'>
          <div className='Circle'>
            <p className='NumberTitle'>1</p>
          </div>
        </div>
        <div className='Bar1'></div>
        <div className='Number2'>
          <div className='Circle'>
            <p className='NumberTitle'>2</p>
          </div>
        </div>
        <div className='Bar2'></div>
        <div className='Number3'>
          <div className='Circle'>
            <p className='NumberTitle'>3</p>
          </div>
        </div>
        <p className='NumberDescription1'>プロフィール</p>
        <p className='NumberDescription2'>経歴</p>
        <p className='NumberDescription3'>ポートフォリオ</p>
      </div>

    </div>
  )
}

export default Header2