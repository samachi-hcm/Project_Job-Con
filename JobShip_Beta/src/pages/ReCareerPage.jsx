import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//components
import Header1 from '../components/Header1'
import Footer from '../components/Footer'
import Forms from '../components/Forms'
import RedirectButton from '../components/RedirectButton'
//linked page

//styles
import { Col, Container, Row } from 'react-bootstrap'

const ReCareerPage = () => {

  const navigate = useNavigate();

  const toHome = () => {
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }} >
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Forms mode="career" />
            <Row>
              
              <Col xs={{ span: 4, offset: 8 }} style={{ textAlign: "right" }}>
                <RedirectButton buttonRabel="変更を適用する" onClick={() => toHome()} />
              </Col>
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

export default ReCareerPage