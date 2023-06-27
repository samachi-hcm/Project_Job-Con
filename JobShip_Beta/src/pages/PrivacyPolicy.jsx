import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';
import { useViewport } from 'react-viewport-hooks';

import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase';

//components
import Header1 from '../components/Header1';
import News from '../components/News';
import PortfolioButton from '../components/PortfolioButton';
import SuggestButton from '../components/SuggestButton';
import Contest from '../components/Contest';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';

//linked pages
import NewCarrerPage from './NewCareerPage';
import NewProfilePage from './NewProfilePage';
import ReCareerPage from './ReCareerPage';

//styles

const PrivacyPolicy = () => {
  const profileData = getUserData('profile');
  const careerData = getUserData('career');
  const recordData = getUserData('record');
  const accountData = getUserData('account');
  const googleData = getUserData();
  const profileImg = googleData?.photoURL;
  const width = useViewport().vw;
  const height = useViewport().vh;

  const location = useLocation();

  const [user, loading] = useAuthState(auth);
  const [otheruser, setOtheruser] = useState("")
  const [NameSize, setNameSize] = useState('12px');
  const [nameESize, setNameESize] = useState('6px');
  const [CareerSize, setCareerSize] = useState('6px');
  const [RecordSize, setRecordSize] = useState('6px');
  const [displayOtherPage, setDisplayOtherPage] = useState(false); // 追加: テスト表示用のステート

  const otherProfile = getUserData("profile",otheruser)
  const otherCareer = getUserData("career",otheruser)
  const otherRecord = getUserData("record",otheruser)
  const otherGoogle = getUserData(null,otheruser)
  const otherImg = otherGoogle?.photoURL
  

  const navigate = useNavigate();

  const toReCareer = () => {
    navigate('/ReCareer');
  };

  const toReRecord = () => {
    navigate('./ReRecord');
  };

  const toReProfile = () => {
    navigate('./ReProfile');
  };

  let aspect = width / height;

  useEffect(() => {
        if (aspect < 1) {
      setNameSize('50px'); // スマートフォン向けのフォントサイズ
      setNameESize('30px');
      setCareerSize('20px');
      setRecordSize('20px');
    } else if (aspect < 1.5) {
      setNameSize('16px'); // タブレット向けのフォントサイズ
    } else {
      setNameSize('25px'); // デスクトップ向けのフォントサイズ
      setNameESize('15px');
      setCareerSize('15px');
      setRecordSize('15px');
    }
  }, [width]);

  const [document, setDocument] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "API", "PrivacyPolicy");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const saveShot = docSnap.data().document;
        setDocument(saveShot)
      }
    };
    fetchData();
  }, []);

  const makeLine = (data) => {
    if (data) {
      const Content = data.split('¥n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));

      return Content;
    } else {
      return '';
    }
  };

  return (
    <div className="PrivacyPolicy" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="HeaderWrapper">
        <Header1 />
      </div>

      <Container fluid style={{ marginTop: '30px', flexGrow: '1' }}>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 10, offset: 1 }}>
          <p>{makeLine(document)}</p>
          </Col>
        </Row>
      </Container>

      <div className="FooterWrapper" style={{ marginTop: '100px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
