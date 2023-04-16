import React from 'react'

import './css/TextareaInput.css'

const TextareaInput = ({type,placeHolder}) => {
  return (
    <div className='TextareaInput'>
      <textarea wrap='soft' type="text" className='textbox' placeholder={placeHolder}></textarea>
    </div>
  )
}

export default TextareaInput