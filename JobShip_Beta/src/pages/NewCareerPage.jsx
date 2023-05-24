import React, { useState } from 'react'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'
import Button from '../components/RedirectButton'
import AddButton from '../components/AddButton'
import Forms from '../components/Forms'
import Stepper from '../components/Stepper'
//linked page

//styles
import { Col, Container, Row } from 'react-bootstrap'

const NewCareerPage = () => {

  return (
    <div className='NewCareerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container style={{marginTop:"30px"}}>
        <Row >
          <Col xs={{ span: 4, offset: 4 }}>
            <Stepper nowStep={2} />
          </Col>
        </Row>
      </Container>

      <Container fluid style={{marginTop:"30px"}}>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Forms mode="career" />
          </Col>
        </Row>
      </Container>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage