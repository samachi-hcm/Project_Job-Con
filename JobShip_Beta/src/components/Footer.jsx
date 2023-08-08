import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  // ロゴとアイコンの情報
  const JobRecord_IconRE = {
    imgAddress: "/JobRecord_iconRE.png"
  }

  const JobRecord_LogoRE = {
    imgAddress: "/JobRecord_LogoRE.png"
  }

  const Shioh_LogoRE = {
    imgAddress: "/Shioh_LogoRE.png"
  }

  const navigate = useNavigate();

  // プライバシーポリシーへの遷移
  const toPrivacyPolicy = () => {
    navigate('/PrivacyPolicy');
  }

  // 利用規約への遷移
  const toTermsOfService = () => {
    navigate('/TermsOfService');
  }

  // 運営会社のウェブサイトへの遷移
  const toCompanyWebsite = () => {
    window.open('https://shioh.jp/', '_blank');
  }

  return (
    <Container fluid style={{ backgroundColor: "#7233B4", height: "110px" }}>
      <Row>
        {/* サイトロゴとアイコンへのリンク */}
        <Col style={{ paddingTop: "20px", paddingLeft: "10px", height: "60px" }} xs="auto">
          <Link to="/" style={{ margin: "0" }}>
            <img src={JobRecord_IconRE.imgAddress} style={{ height: "70%" }} />
            <img src={JobRecord_LogoRE.imgAddress} style={{ height: "80%", marginLeft: "5px" }} />
          </Link>
        </Col>

        {/* プライバシーポリシーへのリンク */}
        <Col md={{ offset: "5", span: "auto" }} lg={{ offset: "7", span: "auto" }} style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={toPrivacyPolicy}>プライバシーポリシー</a>
        </Col>
        {/* 利用規約へのリンク */}
        <Col md="auto" lg="auto" style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={toTermsOfService}>利用規約</a>
        </Col>
        {/* 運営会社へのリンク */}
        <Col md="auto" lg="auto" style={{ paddingTop: "25px", fontSize: "small", color: "#ffffff", textAlign: 'right' }}>
          <a onClick={toCompanyWebsite}>運営会社</a>
        </Col>
      </Row>
      <Row>
        {/* 運営会社のロゴ */}
        <Col style={{ height: "50px", textAlign: "right", paddingRight: "30px", paddingTop: "10px" }} lg={{ offset: "10", span: "2" }}>
          <Link to="/" style={{ margin: "0" }}>
            <img src={Shioh_LogoRE.imgAddress} style={{ height: "60%", marginLeft: "5px" }} />
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer;
