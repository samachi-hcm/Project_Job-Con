import React from 'react'
import './css/Header1.css'

const JobRecord_Logo = {
  imgAddess: "../../public/JobRecord_Logo.png",
  pageAddress:"#"
}

const JobRecord_Icon ={
  imgAddess:"../../public/JobRecord_Icon.png",
}

const Header1 = () => {
  return (
    <>
      <div className='Header1'>
          <img className='Icon' src={JobRecord_Icon.imgAddess} /> 
          <img className='Logo' src={JobRecord_Logo.imgAddess} /> 
       
         
      </div>
    </>
  )
}

export default Header1