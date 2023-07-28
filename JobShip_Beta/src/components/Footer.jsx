import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './css/Footer.css'

const Footer = () => {

  const JobRecord_IconRE = {
    imgAddess: "/JobRecord_iconRE.png"
  }

  const JobRecord_LogoRE = {
    imgAddess: "/JobRecord_LogoRE.png"
  }

  const Shioh_LogoRE = {
    imgAddess: "/Shioh_LogoRE.png"
  }

  const navigate = useNavigate()

  const toPrivacyPolicy = () => {
    navigate('/PrivacyPolicy')
  }

  const toTermsOfService = () => {
    navigate('/TermsOfService')
  }

  const toCompanyWebsite = () => {
    window.open('https://shioh.jp/', '_blank');
  }

  return (
    <Container fluid style={{ backgroundColor: "#7233B4", height: "110px" }}>
      <Row>

        <Col style={{ paddingTop: "20px", paddingLeft: "10px", height: "60px" }} xs="auto">
          <Link to="/" style={{ margin: "0" }}>
            <img src={JobRecord_IconRE.imgAddess} style={{ height: "70%" }} />
            <img src={JobRecord_LogoRE.imgAddess} style={{ height: "80%", marginLeft: "5px" }} />
          </Link>
        </Col>

        <Col md={{ offset: "5", span: "auto" }} lg={{ offset: "7", span: "auto" }} style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={() => toPrivacyPolicy()}>プライバシーポリシー</a>
        </Col>
        <Col md="auto" lg="auto" style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={() => toTermsOfService()}>利用規約</a>
        </Col>
        <Col md="auto" lg="auto" style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={() => toCompanyWebsite()}>運営会社</a>
        </Col>
      </Row>
      <Row>

        <Col style={{ height: "50px", textAlign: "right", paddingRight: "30px", paddingTop: "10px" }} lg={{ offset: "10", span: "2" }}>
          <Link to="/" style={{ margin: "0" }}>
            <img src={Shioh_LogoRE.imgAddess} style={{ height: "60%", marginLeft: "5px" }} />
          </Link>
        </Col>

      </Row>
    </Container>
  )
}

export default Footer