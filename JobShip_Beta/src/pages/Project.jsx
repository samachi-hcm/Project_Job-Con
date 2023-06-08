import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Carousel,Badge } from 'react-bootstrap';

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

const Project = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className='Project' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }}>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Row>
              <Col style={{ fontSize: 'xx-large' }}>
                プロジェクト名
              </Col>
            </Row>
            <Row>
              <Col xs="1">
              aiko
              </Col>
              <Col>
              企業名
              </Col>
            </Row>
            <Row>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400?text=Carousel+Image+1"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400?text=Carousel+Image+2"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400?text=Carousel+Image+3"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            </Row>
            <Row>
              <Col xs="8">
              <Badge>
                text
              </Badge>
              </Col>
              <Col xs="4">
                <RedirectButton buttonRabel={"応募する"}/>
              </Col>
            </Row>
            <Row>
              <Col xs="8">
                telisuto
                eaagaewgaeg
                <br />
                eaagaewgae
              </Col>
              <Col style={{backgroundColor:"Gray"}}>
              kgpaoe
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>

      <div className='FooterWrapper' style={{marginTop:"100px"}}>
        <Footer />
      </div>
    </div>
  )
}

export default Project