import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import './css/Footer.css'

const Footer = () => {
  
  const JobRecord_IconRE = {
    imgAddess:"/JobRecord_iconRE.png"
  }

  const JobRecord_LogoRE = {
    imgAddess:"/JobRecord_LogoRE.png"
  }

  const Shioh_LogoRE = {
    imgAddess:"/Shioh_LogoRE.png"
  }

  return (
    <Container fluid style={{backgroundColor:"#7233B4",height:"110px"}}>
      <Row>
        <Col style={{paddingTop:"20px",paddingLeft:"10px",height:"60px"}} xs="auto">
          <img src={JobRecord_IconRE.imgAddess} style={{height:"70%"}}/>
          <img src={JobRecord_LogoRE.imgAddess} style={{height:"80%",marginLeft:"5px"}}/>
        </Col>
        <Col md={{offset:"5",span:"auto"}} lg={{offset:"7",span:"auto"}} style={{paddingTop:"25px",fontSize:"small",color:"#ffffff", textAlign:'right'}}>
        <a>プライバシーポリシー</a>
        </Col>
        <Col  md="auto" lg="auto" style={{paddingTop:"25px",fontSize:"small",color:"#ffffff", textAlign:'right'}}>
        <a>利用規約</a>
        </Col>
        <Col md="auto" lg="auto" style={{paddingTop:"25px",fontSize:"small",color:"#ffffff", textAlign:'right'}}>
        <a>運営会社</a>
        </Col>
      </Row>
      <Row>
        <Col style={{height:"50px",textAlign:"right",paddingRight:"30px",paddingTop:"10px"}} lg={{offset:"10",span:"2"}}>
        <img src={Shioh_LogoRE.imgAddess} style={{height:"60%",marginLeft:"5px"}}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer