import React from 'react'
import { useState } from 'react'
import CareerInput from './Form'

import './css/DeleteButton.css'

const DeleteButton = ({onClick, placeHolder}) => {

    return (
        <div className='DeleteButton'>
            <button className="ButtonDelete" onClick={onClick} type='button'>
                {/*<p className='ButtonDescription'>{placeHolder}</p> */}
                
                <p className='ButtonDescription'>×</p>
            </button>
        </div>
    )
}

export default DeleteButton 
