import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import RadioButton from './RadioButton'
import TextInput from './TextInput'
import Calender from './Calender'
import CheckBox from './CheckBox'
import CustomCheckBox from './CustomCheckBox'
import { useViewport } from 'react-viewport-hooks';

import { useState, useEffect, useRef } from 'react';

import './css/ProfileInput.css'



const ProfileInput = ({ familyName, firstName, familyNameE, firstNameE,  gender, job,  savedData, birthDay, errors, customJob }) => {

  const isJobChecked = (jobLabel) => {
  if (Array.isArray(savedData?.job)) {
    return savedData?.job?.includes(jobLabel);
  } else if (typeof savedData?.job === 'string') {
    return savedData?.job === jobLabel;
  } else {
    return false;
  }
}

  const [TextSize, setTextSize] = useState("12px")
  const [JobChoiceSize, setJobChoiceSize] = useState("12px")
  const [MarginSize, setMarginSize] = useState("20px")
  const width = useViewport().vw
  const height = useViewport().vh

  let aspect = width / height

  useEffect(() => {
    
    console.log(aspect)
    if (aspect < 1) {
      setTextSize('25px') ; // スマートフォン向けのフォントサイズ
      setJobChoiceSize('25px') ;
      setMarginSize('40px')
    } else if (aspect < 1.5) {
      setTextSize('16px') ; // タブレット向けのフォントサイズ
      setJobChoiceSize('25px') ;
    } else {
      setTextSize('25px') ; // デスクトップ向けのフォントサイズ
      setJobChoiceSize('16px') ;
    }
  }, [width])

  return (
    <div className='ProfileInput'>
      <Container style={{ marginTop: "30px" }}>
        <Row>


          <Col xs="11" lg="5" style={{marginBottom:"5px"}}>
            <Row>
              <p style={{ marginBottom: "5px", fontSize:TextSize}}>名前/Name</p>
              <Col xs="6" >
                <TextInput placeHolder="山田" action={familyName} defaultValue={savedData?.familyName} error={errors.familyName} />
                <div style={{ paddingTop: "3px" }}></div>
                <TextInput placeHolder="Yamada" action={familyNameE} defaultValue={savedData?.familyNameE} />
              </Col>
              <Col xs="6">
                <TextInput placeHolder="太郎" action={firstName} defaultValue={savedData?.firstName} error={errors.firstName}/>
                <div style={{ paddingTop: "3px" }}></div>
                <TextInput placeHolder="Taro" action={firstNameE} defaultValue={savedData?.firstNameE} />
              </Col>
            </Row>

            <Row>
              <p style={{ marginBottom: "5px", marginTop: MarginSize , fontSize:TextSize}}>性別</p>
              <Col xs="4" style={{fontSize:JobChoiceSize}}>
                <RadioButton label="男性" action={gender} checked={savedData?.gender === "男性"} />
              </Col>
              <Col xs="4" style={{fontSize:JobChoiceSize}}>
                <RadioButton label="女性" action={gender} checked={savedData?.gender === "女性"} />
              </Col>
              <Col xs="4" style={{fontSize:JobChoiceSize}}>
                <RadioButton label="その他" action={gender} checked={savedData?.gender === "その他"} />
              </Col>
            </Row>
            
            <Row>
              <p style={{ marginBottom: "5px", marginTop: MarginSize , fontSize:TextSize}}>誕生日</p>
              <Col xs="8">
                <TextInput placeHolder="2023/04/19" action={birthDay} defaultValue={savedData?.birthDay} error={errors.birthDay}/>
              </Col>
            </Row>
          </Col>

            <Row>
              <p style={{ marginBottom: "5px", marginTop: MarginSize , fontSize:TextSize}}>興味のある職種</p>
              <Col xs="auto" style={{ paddingLeft: "0", fontSize:JobChoiceSize}}>
                <CheckBox label="営業" action={job} defaultChecked={isJobChecked("営業")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="企画" action={job} defaultChecked={isJobChecked("企画")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="人事" action={job} defaultChecked={isJobChecked("人事")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="タレント" action={job} defaultChecked={isJobChecked("タレント")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="エンジニア" action={job} defaultChecked={isJobChecked("エンジニア")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="デザイナー" action={job} defaultChecked={isJobChecked("デザイナー")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" , fontSize:JobChoiceSize}}>
                <CheckBox label="クリエイター" action={job} defaultChecked={isJobChecked("クリエイター")} />
              </Col>
            </Row>
            <Row>
              <Col xs="6" style={{ paddingLeft: "10px" }}>
                <TextInput placeHolder="その他" action={customJob} defaultValue={savedData?.customJob} />
              </Col>
            </Row>

        </Row>
      </Container>

    </div>
  )
}

export default ProfileInput