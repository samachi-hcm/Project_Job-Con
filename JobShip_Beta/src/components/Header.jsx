import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

// ロゴとアイコンの情報
const JobRecord_Logo = {
  imgAddress: "/JobRecord_Logo.png",
  pageAddress: "#",
};

const JobRecord_Icon = {
  imgAddress: "/JobRecord_icon.png",
};

const Header1 = () => {
  const navigate = useNavigate();

  // ユーザー情報とチェックの状態を管理
  const [isUserChecked, setIsUserChecked] = useState(false);
  const userDataRef = useRef({});

  // ユーザー情報と読み込み状態を取得
  const [user, loading] = useAuthState(auth);

  // ユーザーが管理者かどうかのチェック
  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  // ユーザーの管理者チェック
  useEffect(() => {
    const allowedUid = 'bxEmwaMWBdggleMi7kgyZbQIMap1';
    if (user && userDataRef.current.uid === allowedUid) {
      setIsUserChecked(true);
    } else {
      setIsUserChecked(false);
    }
  }, [user]);

  // サインアウトの処理
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('サインアウトしました');
        // サインアウト後の処理を追加する場合はここに記述する
      })
      .catch((error) => {
        console.error('サインアウト中にエラーが発生しました', error);
      });
    navigate('/SignupPage');
  };

  // 各ページへの遷移
  const toES = () => {
    navigate('/EditSheet');
  };

  const toHome = () => {
    navigate('/');
  };

  const toProjects = () => {
    navigate('/Projects');
  };

  const toConsole = () => {
    navigate('/Console');
  };

  const toCheckApplicants = () => {
    navigate('/CheckApplicants');
  };

  // ボタン表示を管理する部分
  const [editProject, setEditProject] = useState((<></>));
  const [checkApplicant, setCheckApplicant] = useState((<></>));

  useEffect(() => {
    if (isUserChecked) {
      setCheckApplicant((
        <Button onClick={toCheckApplicants} style={{ marginTop: "6px", background: "none", border: "none", color: "blue" }}>応募者を確認</Button>
      ));
      setEditProject((
        <Button onClick={toConsole} style={{ marginTop: "6px", background: "none", border: "none", color: "blue" }}>プロジェクト作成</Button>
      ));
    }
  }, [isUserChecked]);

  return (
    <>
      <div className="Header1">
        <Container fluid>
          <Row style={{ marginTop: "5px" }}>
            {/* ロゴ */}
            <Col xs="auto" style={{ height: "50px" }}>
              <Button style={{ width: "auto", height: "50px", border: "none", background: "none", padding: "0", margin: "0" }}>
                <img className="Icon" src={JobRecord_Icon.imgAddress} style={{ height: "80%" }} onClick={toHome} />
              </Button>
            </Col>
            {/* テキストを生成ページへの遷移 */}
            <Col xs="auto" style={{ height: "50px" }}>
              <Button onClick={toES} style={{ marginTop: "6px", background: "none", border: "none", color: "black", fontWeight: "500" }}>テキストを生成</Button>
            </Col>
            {/* プロジェクトを探すページへの遷移 */}
            <Col xs="auto" style={{ height: "50px" }}>
              <Button onClick={toProjects} style={{ marginTop: "6px", background: "none", border: "none", color: "black", fontWeight: "500" }}>プロジェクトを探す</Button>
            </Col>
            {/* 応募者を確認ボタン */}
            <Col xs="auto" style={{ height: "50px" }}>
              {checkApplicant}
            </Col>
            {/* プロジェクト作成ボタン */}
            <Col xs="auto" style={{ height: "50px" }}>
              {editProject}
            </Col>
            {/* ログアウトボタン */}
            <Col style={{ textAlign: "right" }}>
              <Button onClick={handleSignOut} style={{ marginTop: "5px", background: "none", border: "none", height: "50px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" color='black' />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" color='black' />
                </svg>
                <p style={{ color: "black", fontSize: "small" }}>ログアウト</p>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header1;
