import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Project from './Project';
import RedirectButton from '../components/RedirectButton';

const ApplyPage = ({receivedId}) => {
  return (
    <div className='ApplyPage' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header />
      </div>
      <Container fluid style={{ marginTop: '30px', flexGrow: 1 }}>
        <Row>
          
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 10, offset: 1 }}>
          <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>仮応募が完了致しました。<br />数日以内に担当よりご連絡致します。</p>
                  <Project receivedId={receivedId} onPage={true}/>
          </Col>
        </Row>
      </Container>
      <div className='FooterWrapper' style={{ marginTop: '100px' }}>
        <Footer />
      </div>
    </div>
  )
}

export default ApplyPage