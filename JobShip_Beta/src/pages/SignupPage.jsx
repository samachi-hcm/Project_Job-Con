import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// components
import Header1 from '../components/Header1';
import Footer from '../components/Footer';
import AccountCard_L from '../components/AccountCard_L';
import AccountCard_R from '../components/AccountCard_R';
import './css/SignupPage.css';

import { useViewport } from 'react-viewport-hooks';

import { useState, useEffect, useRef } from 'react';

const SignupPage = () => {
  const attention = (
    <p>
      アカウントに登録することにより<a href="#">利用規約</a>及び<a href="#">プライバシーポリシー</a>に同意したとみなします。
    </p>
  );

  const [TextSize, setTextSize] = useState("12px")
  const [MarginSize, setMarginSize] = useState("30px")
  const width = useViewport().vw
  const height = useViewport().vh

  let aspect = width / height

  useEffect(() => {
    
    console.log(aspect)
    if (aspect < 1) {
      setTextSize('22px') ; // スマートフォン向けのフォントサイズ
      setMarginSize('50px')
    } else if (aspect < 1.5) {
      setTextSize('16px') ; // タブレット向けのフォントサイズ
    } else {
      setTextSize('15px') ; // デスクトップ向けのフォントサイズ
    }
  }, [width])

  return (
    <div className="SignUpPage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container fluid style={{ padding: "50px",flexGrow:"1",paddingBottom:"0" }} >
        <Row>
          <h1 style={{ fontWeight: "700", fontSize: "60px",lineHeight:"100px" }}>
            「君に何ができるの？」に<br />&nbsp;&nbsp;あなただけの解を。
          </h1>
        </Row>
        <Row>
          <Col xs="12" lg="7">
            <p style={{ marginTop: "47px",  fontWeight: "bold", paddingLeft: "30px", lineHeight: MarginSize, letterSpacing: "1px" , fontSize:TextSize}}>
              JobRecordは、
              <br />今までの経験をデータベースに格納し、
              <br />GPTで非生産的な作業時間を短縮することによって
              <br />あなたの新しい経験をサポートするプラットフォームです。
              <br />
              <br />「学生時代に力を入れたことは、ガクチカを書くことでした。」
              <br />「私には経験がないので、これから頑張ります。」
              <br />を
              <br />「学生時代に力を入れたことは、このレコードを見ればわかります。」
              <br />「私にはこんな経験があるので、こんな仕事は任せてください。」
              <br />に、変えてみませんか？
            </p>
          </Col>
          <Col xs="12" lg="5" style={{ marginTop: "47px" }}>
            <AccountCard_L attention={attention} />
          </Col>
        </Row>
      </Container>

      <div className="FooterWrapper">
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;