import React, { useState } from 'react'

//components
import Header1 from '../components/Header'
import Footer from '../components/Footer'
import Forms from '../components/Forms'
import RedirectButton from '../components/RedirectButton'
//linked page

//styles
import { Col, Container, Row } from 'react-bootstrap'

const ReCareerPage = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }} >
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Forms mode="career" RPageLabel="変更を適用する" RPageAdd='/' LPageLabel='ホームに戻る' LPageAdd='/' />
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