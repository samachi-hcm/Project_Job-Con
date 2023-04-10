import React from 'react'

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