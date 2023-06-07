import React from 'react';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';
import GoogleButton from './GoogleButton'

const AccountCard_L = ({ attention, }) => {

  const accountCardStyle = {
    height: '350px',
    position: 'relative'
  };

  const contentsTitleStyle = {
    fontFamily: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif',
    fontSize: 'x-Large',
    fontWeight: 'bold',
    textAlign: "center"
  };

  const attentionStyle = {
    fontFamily: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif',
    fontSize: 'x-small',
    textAlign: 'left',
    position: 'absolute',
    bottom: '0',
  };


  return (
    <div className="AccountCard_L" style={accountCardStyle}>
      <Container>
        <Row>
          <Col style={contentsTitleStyle} xs={{ offset: "2", span: "8" }} >
            <p>ログインまたは新規登録</p>
          </Col>
        </Row>
        <Row>
          <Col xs={{ offset: "2", span: "10" }} style={{ marginTop: "80px" }}>
            <GoogleButton />
          </Col>
        </Row>
        <Row>
          <Col style={attentionStyle} xs={{ offset: "2", span: "8" }}>
            {attention}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountCard_L;
