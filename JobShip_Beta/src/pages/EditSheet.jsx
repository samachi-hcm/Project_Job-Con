import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';

// components
import Header1 from '../components/Header1'
import Contest from '../components/Contest'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';
import Chat from '../components/Chat';
import CheckBox from '../components/CheckBox';

// linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'
import ReCareerPage from './ReCareerPage';
import TextareaInput from '../components/TextareaInput';

const EditSheet = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [message, setMessage] = useState([]);

  const profileData = getUserData("profile");
  const careerData = getUserData("career");
  const recordData = getUserData("record");

  const handleCheckboxChange = (index) => {
    const selectedData = [...message];
    const dataIndex = selectedData.indexOf(recordData[index]);

    if (dataIndex > -1) {
      selectedData.splice(dataIndex, 1);
    } else {
      selectedData.push(recordData[index]);
    }

    setMessage(selectedData);
  };

  return (
    <div className='EditSheet'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12} style={{ marginTop: "30px" }}>
            <Row>
              {recordData &&
                recordData.map((data, index) => (
                  <Accordion key={index}>
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>
                        <Col xs="auto" style={{ margin: "0" }}>
                          <CheckBox
                            checked={message.includes(data)}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </Col>
                        <Col xs={3} style={{ paddingLeft: "10px" }}>
                          {data.year}年 {data.month}月
                        </Col>
                        <Col xs="auto">{data.description}</Col>
                      </Accordion.Header>
                      <Accordion.Body>{data.detail}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
            </Row>
            <Chat input={message} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditSheet;
