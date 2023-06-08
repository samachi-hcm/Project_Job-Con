import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
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
  const sheetData = getUserData("sheet");

  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [savedData, setSavedData] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const updatedTitles = [...sheetData];
      for (let i = updatedTitles.length; i < 10; i++) {
        updatedTitles[i] = { title: '' };
      }
      setTitles(updatedTitles);
    };
    setSavedData(sheetData)
  
    fetchData();
  }, [sheetData]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [titles, setTitles] = useState([]);

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
    <div className='EditSheet'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid>
        <Row>
          <Col lg="2" md="1" style={{ margin: "0", paddingLeft: "0" }}>
            <Nav className="flex-column" style={{ backgroundColor: "#f7f7f7", height: "100vh", margin: "0", padding: "0" }}>
              {titles &&
                titles.map((data, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      onClick={() => handleNavItemClick(index)}
                      style={{ backgroundColor: selectedNavIndex === index ? "#7233B4" : "" }}
                    >
                      {index+1}_&nbsp;{data.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
          </Col>
          <Col lg={{ span: 6, offset: 1 }} md={{ span: 8, offset: 1 }} xs={12} style={{ marginTop: "30px" }}>
            <Row>
              {recordData &&
                recordData.map((data, index) => (
                  <>
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
                                <Col xs="auto" style={{ margin: "0" }}>

                                </Col>
                                <Col xs={3} style={{ paddingLeft: "10px" }}>
                                  {data.year}年 {data.month}月
                                </Col>
                                <Col xs="auto">{data.description}</Col>
                              </Accordion.Header>
                              <Accordion.Body>{data.detail}</Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    </Container>
                  </>
                ))}
            </Row>
            <Chat input={message} checked={isCheckboxChecked} slot={selectedNavIndex} savedData={savedData}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditSheet;
