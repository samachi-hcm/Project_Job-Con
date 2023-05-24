import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';

//linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'
import ReCareerPage from './ReCareerPage';

//styles
import './css/HomePage.css'

const HomePage = () => {

  const careerData = getUserData("career")
  const profileData = getUserData("profile")
  const recordData = getUserData("record")
  const accountData = getUserData()
  const profileImg = accountData?.photoURL

  const navigate = useNavigate();

  const toReCareer = () => {
    navigate('/ReCareer')
  }

  const toRerecord = () => {
    navigate('./ReRecord')
  }

  console.log(recordData)

  return (
    <div className='HomePage'>

      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Row className='ProfileW'>
              {profileData && (
                <>
                  <Container>
                    <Row>
                    <Col className='ImgW' xs={2}>
                        <img src={profileImg} alt="Profile" className="profile-image" style={{ width: '100%', height: 'auto' }} />
                      </Col>
                      <Col className='NameSocialW' xs={6}>
                      <Row className='Name' style={{ fontSize: 'xx-large' }}>
                          <Col xs="auto" >
                            {profileData.familyName}
                          </Col>
                          <Col xs="auto" style={{ padding: 0 }}>
                            {profileData.firstName}
                          </Col>
                        </Row>
                        <Row className='NameE'>
                          <Col xs="auto" >
                            {profileData.familyNameE}
                          </Col>
                          <Col xs="auto" style={{ padding: 0 }}>
                            {profileData.firstNameE}
                          </Col>
                        </Row>
                        <Row className='Social'>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </>
              )}
            </Row>

            <Row className='CareerW'>
              <Container>
                <Row>
                  <p>
                    経歴
                  </p>
                </Row>
                <Row>
                  {careerData && careerData.map((data, index) => (
                    <Row key={index}>
                      <Col xs={3}>{data.year}年 {data.month}月</Col>
                      <Col xs="auto">{data.description}</Col>
                    </Row>
                  ))}
                </Row>
                <Row style={{paddingTop: "10px" }}>
                  <Col xs="9">
                  </Col>
                  <Col xs="3" style={{ textAlign: 'right' }}>
                    <RedirectButton buttonRabel="編集する" onClick={()=>toReCareer()} />
                  </Col>
                </Row>
              </Container>
            </Row>

            <Row className='RecordW'>
              <Container>
              <Row>
                  <p>
                    レコード
                  </p>
                </Row>
                <Row>
                {recordData && recordData.map((data, index) => (
                  <Accordion>
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>
                        <Col xs={3}>{data.year}年 {data.month}月</Col>
                        <Col xs="auto">{data.description}</Col>
                      </Accordion.Header>
                      <Accordion.Body>
                        {data.detail}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
                </Row>
                <Row style={{paddingTop: "10px" }}>
                  <Col xs="9">
                  </Col>
                  <Col xs="3" style={{ textAlign: 'right' }}>
                    <RedirectButton buttonRabel="編集する" />
                  </Col>
                </Row>
              </Container>
            </Row>

          </Col>
        </Row>
      </Container>

      <div className='FooterWrapper'>
        <Footer />
      </div>

    </div>
  )
}

export default HomePage
