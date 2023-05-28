import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Button } from 'react-bootstrap';

import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import DeleteButton from './DeleteButton'
import NewCareerPage from './Forms'

import './css/Form.css'

const Form = ({ year, month, description, detail, savedData, mode, deleteForm, form }) => {
 
  const { register, handleSubmit, formState: { errors }, unregister } = useForm();

  const recordCheck = (mode) => {
    
    if (mode === "record") {
      return (
        <div className='DetailInput'>
          <TextareaInput action={detail} defaultValue={savedData?.detail} />
        </div>
      );
    } else {
      return null
    }
  }

  const inputWrapperStyle = mode === "record" ? "375px" : "130px"

  return (
    <Container className='Form' style={{border: "solid 1px #c7c7c7",backgroundColor: "white",borderRadius:"4px", height: inputWrapperStyle, margin:"auto", position: "relative"}}>
      <DeleteButton onClick={() => deleteForm(form)} style={{ position: "absolute", top: 0, right: 0 }}/>
      <Row style={{marginTop:"20px"}}>
        <Col xs="8">
          <Row>
            <Col xs="3" style={{display:"flex"}}>
              <div style={{ width: "70%" }} >
                <TextInput placeHolder={year.name} action={year} defaultValue={savedData?.year} />
              </div>
              <p style={{ margin:"5px"}}>年</p>
            </Col>
            <Col xs="3" style={{display:"flex"}}>
              <div style={{ width: "70%" }} >
                <TextInput placeHolder="12" action={month} defaultValue={savedData?.month} />
              </div>
              <p style={{ margin:"5px"}}>月</p>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{marginTop:"10px"}}>
        <Col className='DescriptionInput'>
          <TextInput placeHolder="経歴を入力" action={description} defaultValue={savedData?.description} />
        </Col>
      </Row>

      <Row style={{marginTop:"10px"}}>
        <Col className='DetailInput'>
          {recordCheck(mode)}
        </Col>
      </Row>
    </Container>
  )
}

export default Form



