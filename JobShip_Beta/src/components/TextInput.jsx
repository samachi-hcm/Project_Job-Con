import React from 'react'
import { FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { css } from '@emotion/react'

/** @jsxImportSource @emotion/react */

const TextInput = ({ type, placeHolder, action, defaultValue, error, onChange, value }) => {

  const inputStyle = css`
    border: none;
    border-bottom: solid 1px #c7c7c7;
    padding: 12px;
    display: inline-block;
    width: 100%;
    &:placeholder{
      font-size: 16px;    
      opacity: 30%;
    }
    &:focus-within{
    outline: none;
    border: none;
    border-bottom: solid 3px rgba(114, 51, 180, 0.7);
    }
  `

  return (
    <div className='TextInput'>
      <input
        css={inputStyle}
        type='text'
        defaultValue={defaultValue}
        {...action}
        className='textbox'
        placeholder={placeHolder}
        style={{ fontWeight: "600" }}
        onChange={onChange}
        value={value}
      ></input >
      {error && <p style={{ color: 'red', fontSize: "17px", margin: "0" }}>{error.message}{console.log(error.message)}</p>}

    </div>
  )
}


export default TextInput