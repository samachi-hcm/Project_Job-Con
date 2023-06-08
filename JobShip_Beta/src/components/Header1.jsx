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
          <Row>
            <Col xs="auto" style={{height:"50px"}}>
            <img className="Icon" src={JobRecord_Icon.imgAddess} style={{height:"80%",marginTop:"15%"}}/>
            </Col>
            <Col xs={{offset:10}}>
              <Button onClick={handleSignOut} style={{marginTop:"5%"}}>サインアウト</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header1;