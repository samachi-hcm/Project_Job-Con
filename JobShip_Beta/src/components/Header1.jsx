import React from 'react'
import './css/Header1.css'

const JobShips_Logo = {
  imgAddess: "../../public/JobShips_Logo.png",
  pageAddress:"#"
}

const Header1 = () => {
  return (
    <>
      <div className='Header1'>
        <a href={JobShips_Logo.pageAddress}>
          <img src={JobShips_Logo.imgAddess} />
        </a>
         
      </div>
    </>
  )
}

export default Header1