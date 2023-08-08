import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase';

//components
import Header1 from '../components/Header';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';



const PrivacyPolicy = () => {

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
