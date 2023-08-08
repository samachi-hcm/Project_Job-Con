// 必要なReactコンポーネントとライブラリをインポート
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // react-bootstrapコンポーネントをインポート
import GoogleButton from './GoogleButton'; // Googleログインボタンコンポーネントをインポート

// アカウントカードコンポーネントの定義
const AccountCard_L = ({ attention }) => {
  // アカウントカードのスタイル設定
  const accountCardStyle = {
    height: '350px',
    position: 'relative'
  };

  // コンテンツタイトルのスタイル設定
  const contentsTitleStyle = {
    fontFamily: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif',
    fontSize: 'x-Large',
    fontWeight: 'bold',
    textAlign: "center"
  };

  // 注意事項のスタイル設定
  const attentionStyle = {
    fontFamily: '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif',
    fontSize: 'x-small',
    textAlign: 'left',
    position: 'absolute',
    bottom: '0',
  };

  // アカウントカードコンポーネントの表示
  return (
    <div className="AccountCard_L" style={accountCardStyle}>
      <Container>
        {/* タイトル行 */}
        <Row>
          <Col style={contentsTitleStyle} xs={{ offset: "2", span: "8" }}>
            <p>ログインまたは新規登録</p>
          </Col>
        </Row>
        {/* Googleログインボタン行 */}
        <Row>
          <Col xs={{ offset: "2", span: "10" }} style={{ marginTop: "80px" }}>
            <GoogleButton />
          </Col>
        </Row>
        {/* 注意事項行 */}
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
