import React from 'react'
import './css/Header1.css'
import { Button } from 'react-bootstrap'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

const JobRecord_Logo = {
  imgAddess: "/JobRecord_Logo.png",
  pageAddress: "#",
};

const JobRecord_Icon = {
  imgAddess: "/JobRecord_icon.png",
};


const Header1 = () => {

  const navigate = useNavigate()

  const handleSignOut = () => {
    // サインアウトの処理を実行する
    signOut(auth)
      .then(() => {
        console.log('サインアウトしました');
        // サインアウト後の処理を追加する場合はここに記述する
      })
      .catch((error) => {
        console.error('サインアウト中にエラーが発生しました', error);
      });
    navigate('/SignupPage')
  };

  return (
    <>
      <div className="Header1">
        <Container fluid>
          <Row style={{marginTop:"5px"}}>
            <Col xs="auto" style={{ height: "50px" }}>
              <img className="Icon" src={JobRecord_Icon.imgAddess} style={{ height: "80%", marginTop: "15%" }} />
            </Col>
            <Col xs={{ offset: 10 }} style={{textAlign:"right"}}>
              <Button onClick={handleSignOut} style={{ marginTop: "7%", background:"none",border:"none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"color='black'/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" color='black'/>
                </svg>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header1;