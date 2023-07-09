import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Nav } from 'react-bootstrap';

// components
import Header1 from '../components/Header1';
import Contest from '../components/Contest';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';
import Chat from '../components/Chat';
import CheckBox from '../components/CheckBox';

// linked pages
import NewCarrerPage from './NewCareerPage';
import NewProfilePage from './NewProfilePage';
import ReCareerPage from './ReCareerPage';
import TextareaInput from '../components/TextareaInput';

const EditSheet = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [message, setMessage] = useState([]);

  const profileData = getUserData("profile");
  const recordData = getUserData("record");
  const [sheetData, setSheetData] = useState(null)

  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [savedData, setSavedData] = useState("");

  const [saveFlag, setSaveFlag] = useState(0)
  const [user, loading] = useAuthState(auth);
  const userDataRef = useRef({});
  const [userData, setUserData] = useState("")

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userUid = userDataRef.current.uid;
        const docRef = doc(db, "UserData", userUid, 'Data', `sheetData`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSheetData(saveShot);
        }
      };
      fetchData();
    }
  }, [user,saveFlag]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetDataArray = sheetData ? Object.values(sheetData) : []; // オブジェクトの値を配列に変換
      const updatedTitles = [...sheetDataArray];
      for (let i = updatedTitles.length; i < 10; i++) {
        updatedTitles[i] = { title: '' };
      }
      setTitles(updatedTitles);
    };
    setSavedData(sheetData);
    fetchData();
  }, [sheetData,saveFlag]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [titles, setTitles] = useState([]);
  
  const makeLine = (data) => {
    if(data){
      const Content =
      data.split('¥n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))

    return Content;
    }
    else{
      return ""
    }
  };

  const handleNavItemClick = (index) => {
    setSelectedNavIndex(index);
  };

  const handleCheckboxChange = (index) => {
    const selectedData = [...message];
    const dataIndex = selectedData.indexOf(recordData[index]);

    if (dataIndex > -1) {
      selectedData.splice(dataIndex, 1);
    } else {
      selectedData.push(recordData[index]);
    }
    setIsCheckboxChecked(selectedData.length > 0);
    setMessage(selectedData);
  };

  return (
    <div className='EditSheet' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid style={{ flexGrow: "1" }}>
        <Row>
          <Col lg="2" md="1" style={{ margin: "0", paddingLeft: "0" }}>
            <Nav className="flex-column" style={{ backgroundColor: "#27374D", height: "105%", margin: "0", padding: "0", color: "white" }}>
              {titles &&
                titles.map((data, index) => (
                  <Nav.Item key={index} style={{ color: "white" }}>
                    <Nav.Link
                      onClick={() => handleNavItemClick(index)}
                      style={{ backgroundColor: selectedNavIndex === index ? "#7233B4" : "", color: "whitesmoke" }}>
                      {index + 1}.&nbsp;{data.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
          </Col>
          <Col lg={{ span: 6, offset: 1 }} md={{ span: 8, offset: 1 }} xs={12} style={{ marginTop: "30px" }}>
            <Row style={{ padding: "12px" }}>
              <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
                レコードからESを編集する
              </p>

              <div style={{ height: "20px" }}></div>
              <p style={{ fontSize: "large", padding: "0" }}>
                1.参照するレコードを選ぶ
              </p>
              {recordData &&
                recordData.map((data, index) => (
                  <React.Fragment key={index}>
                    <Container>
                      <Row>
                        <Col xs="auto" style={{ paddingTop: "12px" }}>
                          <CheckBox
                            checked={message.includes(data)}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </Col>
                        <Col>
                          <Accordion key={index}>
                            <Accordion.Item eventKey={index.toString()} key={index}>
                              <Accordion.Header>
                                <Col xs={3} style={{ paddingLeft: "10px", fontWeight: "600" }}>
                                  {data.year}年 {data.month}月
                                </Col>
                                <Col xs="auto" style={{ fontWeight: "600",overflowWrap:"break-word" }}>{data.description}</Col>
                              </Accordion.Header>
                              <Accordion.Body>{makeLine(data.detail)}</Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    </Container>
                  </React.Fragment>
                ))}
            </Row>

            <Chat input={message} checked={isCheckboxChecked} slot={selectedNavIndex} savedData={savedData} setSaveFlag={setSaveFlag} saveFlag={saveFlag} />
          </Col>
        </Row>
      </Container>

      <div className='FooterWrapper' style={{marginTop:"30px"}}>
        <Footer />
      </div>

    </div>
  );
};

export default EditSheet;
