import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import PortfolioInput from '../components/PortfolioInput'
import Button from '../components/RedirectButton'
import AddButton from '../components/AddButton'
import Forms from '../components/Forms'
import Stepper from '../components/Stepper'
import RedirectButton from '../components/RedirectButton'
//linked page

//styles
import './css/NewPortfolioPage.css'
import { Col, Container, Row } from 'react-bootstrap'

const NewPortfolioPage = () => {

  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
  }

  const toNewCareer = () => {
    navigate('/NewCareerPage')   
  }

  return (
    <div className='NewPortfolioPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container style={{ marginTop: "30px" }}>
        <Row >
          <Col xs={{ span: 4, offset: 4 }}>
            <Stepper nowStep={3} />
          </Col>
        </Row>
      </Container>

      <Container fluid style={{ marginTop: "30px" }}>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Forms mode="record" RPageAdd='/' RPageLabel='登録を完了する' LPageAdd='/NewCareerPage' LPageLabel='戻る' />
          </Col>
        </Row>
      </Container>
      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewPortfolioPage