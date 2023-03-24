import React from 'react'

import './css/PortfolioButton.css'

const Portofolio_Logo = {
  imgAddess: "../../public/Portofolio_Logo.png",
  pageAddress:"#"
}

const PortfolioButton = () => {
  return (
    <>
      <div className='PortfolioButton'>
        <div className='Title'>
          ポートフォリオ
        </div>
        <img src= {Portofolio_Logo.imgAddess}></img>
        <p>情報を入力して周囲の人に共有</p>
      </div>
    </>

  )
}

export default PortfolioButton