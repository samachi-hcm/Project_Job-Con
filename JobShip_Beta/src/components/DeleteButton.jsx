import React from 'react'
import { useState } from 'react'
import CareerInput from './Form'
import { Button } from 'react-bootstrap'

import './css/DeleteButton.css'

const DeleteButton = ({ onClick, placeHolder }) => {

    return (
            <Button onClick={onClick} style={{ position: 'absolute', top: '0', right: '10px' , backgroundColor: 'transparent', borderColor: 'transparent'}}>
                <p style={{ margin: "0", fontSize: "30px", color:"black" }}>
                    ×
                </p>
            </Button>
        
    )
}

export default DeleteButton 
