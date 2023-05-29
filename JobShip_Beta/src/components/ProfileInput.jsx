import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import RadioButton from './RadioButton'
import TextInput from './TextInput'
import Calender from './Calender'
import CheckBox from './CheckBox'
import CustomCheckBox from './CustomCheckBox'

import './css/ProfileInput.css'

const ProfileInput = ({ familyName, firstName, familyNameE, firstNameE,  gender, job,  savedData, birthDay, errors, }) => {

  const isJobChecked = (jobLabel) => {
  if (Array.isArray(savedData?.job)) {
    return savedData?.job?.includes(jobLabel);
  } else if (typeof savedData?.job === 'string') {
    return savedData?.job === jobLabel;
  } else {
    return false;
  }
}


  return (
    <div className='ProfileInput'>
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col xs="5">
            <Row>
              <p style={{ marginBottom: "5px" }}>名前/Name</p>
              <Col xs="6">
                <TextInput placeHolder="姓" action={familyName} defaultValue={savedData?.familyName} error={errors.familyName} />
                <div style={{ paddingTop: "3px" }}></div>
                <TextInput placeHolder="family name" action={familyNameE} defaultValue={savedData?.familyNameE} />
              </Col>
              <Col xs="6">
                <TextInput placeHolder="名" action={firstName} defaultValue={savedData?.firstName} error={errors.firstName}/>
                <div style={{ paddingTop: "3px" }}></div>
                <TextInput placeHolder="first name" action={firstNameE} defaultValue={savedData?.firstNameE} />
              </Col>
            </Row>
            <Row>
              <p style={{ marginBottom: "5px", marginTop: "10px" }}>性別</p>
              <Col xs="4">
                <RadioButton label="男性" action={gender} checked={savedData?.gender === "男性"} />
              </Col>
              <Col xs="4">
                <RadioButton label="女性" action={gender} checked={savedData?.gender === "女性"} />
              </Col>
              <Col xs="4">
                <RadioButton label="その他" action={gender} checked={savedData?.gender === "その他"} />
              </Col>
            </Row>
            <Row>
              <p style={{ marginBottom: "5px", marginTop: "10px" }}>誕生日</p>
              <Col xs="8">
                <TextInput placeHolder="2023/04/19" action={birthDay} defaultValue={savedData?.birthDay} error={errors.birthDay}/>
              </Col>
            </Row>
          </Col>
          <Col xs={{offset:"1", span:"6"}}>
            <Row>
              <p style={{ marginBottom: "5px", paddingLeft: "0" }}>興味のある職種</p>
              <Col xs="auto" style={{ paddingLeft: "0", }}>
                <CheckBox label="営業" action={job} checked={isJobChecked("営業")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="企画" action={job} checked={isJobChecked("企画")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="人事" action={job} checked={isJobChecked("人事")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="タレント" action={job} checked={isJobChecked("タレント")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="エンジニア" action={job} checked={isJobChecked("エンジニア")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="デザイナー" action={job} checked={isJobChecked("デザイナー")} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="クリエイター" action={job} checked={isJobChecked("クリエイター")} />
              </Col>
            </Row>
            
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default ProfileInput
