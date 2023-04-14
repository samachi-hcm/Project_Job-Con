import React from 'react'
import { useState } from 'react'
import CareerInput from './CareerInput'

import './css/DeleteButton.css'

const DeleteButton = ({onClick}) => {

    return (
        <div className='DeleteButton'>
            <button className="ButtonDelete" onClick={onClick}>
                <p className='ButtonDescription'>×</p>
            </button>
        </div>
    )
}

export default DeleteButton 