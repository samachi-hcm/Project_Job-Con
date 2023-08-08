// 必要なReactコンポーネントとライブラリをインポート
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // react-bootstrapコンポーネントをインポート
import Footer from '../components/Footer'; // フッターコンポーネントをインポート
import AccountCard_L from '../components/AccountCard_L'; // アカウントカードコンポーネントをインポート
import './css/SignupPage.css'; // スタイルをインポート
import { useViewport } from 'react-viewport-hooks'; // ビューポートフックをインポート

// サインアップページコンポーネントの定義
const SignupPage = () => {
  // 注意事項の内容
  const attention = (
    <p>
      アカウントに登録することにより<a href="#">利用規約</a>及び<a href="#">プライバシーポリシー</a>に同意したとみなします。
    </p>
  );

  // ビューポートの幅と高さを取得
  const width = useViewport().vw;
  const height = useViewport().vh;

  // 幅と高さのアスペクト比を計算
  let aspect = width / height;

  // テキストとマージンのサイズを管理するステート
  const [TextSize, setTextSize] = useState("12px");
  const [MarginSize, setMarginSize] = useState("30px");

  // ウィンドウの幅が変更された時の処理
  useEffect(() => {
    console.log(aspect);
    if (aspect < 1) {
      setTextSize('22px'); // スマートフォン向けのフォントサイズ
      setMarginSize('50px');
    } else if (aspect < 1.5) {
      setTextSize('16px'); // タブレット向けのフォントサイズ
    } else {
      setTextSize('15px'); // デスクトップ向けのフォントサイズ
    }
  }, [width]);

  // サインアップページコンポーネントの表示
  return (
    <div className="SignUpPage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container fluid style={{ padding: "50px", flexGrow: "1", paddingBottom: "0" }}>
        {/* ヘッダータイトル行 */}
        <Row>
          <h1 style={{ fontWeight: "700", fontSize: "60px", lineHeight: "100px" }}>
            「君に何ができるの？」に<br />&nbsp;&nbsp;あなただけの解を。
          </h1>
        </Row>
        {/* コンテンツ行 */}
        <Row>
          <Col xs="12" lg="7">
            <p style={{ marginTop: "47px", fontWeight: "bold", paddingLeft: "30px", lineHeight: MarginSize, letterSpacing: "1px", fontSize: TextSize }}>
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
          {/* アカウントカードコンポーネント */}
          <Col xs="12" lg="5" style={{ marginTop: "47px" }}>
            <AccountCard_L attention={attention} />
          </Col>
        </Row>
      </Container>
      {/* フッターコンポーネント */}
      <div className="FooterWrapper">
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;
