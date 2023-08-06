import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db, storage } from '../Firebase';
import { Container, Row, Col, Carousel, Badge, Button, Form, Modal, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';


//components
import Header from '../components/Header';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';
import CheckBox from '../components/CheckBox';

//linked pages
import NewCarrerPage from './NewCareerPage';
import NewProfilePage from './NewProfilePage';
import ReCareerPage from './ReCareerPage';
import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';

const CheckApplicants = () => {

  const [index, setIndex] = useState(0);
  const [user, loading] = useAuthState(auth);
  const userDataRef = useRef({});
  const [data, setData] = useState();
  const [isUserChecked, setIsUserChecked] = useState(null);
  const [test, setTest] = useState((<p></p>))
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [reload, setReload] = useState(false)


  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'ProjectData'));
      const projectsData = await Promise.all(querySnapshot.docs.map(async (adoc) => {
        const applicantDataRef = doc(db, 'ProjectData', adoc.id, 'Data', 'applicantData');
        const applicantDataSnapshot = await getDoc(applicantDataRef);
        const applicantData = applicantDataSnapshot.exists ? applicantDataSnapshot.data() : "no data";
        return {
          id: adoc.id,
          applicants: applicantData
        };
      }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, [reload]);

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid }
    }
  }, [user]);

  useEffect(() => {
    const allowedUid = 'bxEmwaMWBdggleMi7kgyZbQIMap1';
    if (user && userDataRef.current.uid === allowedUid) {
      setIsUserChecked(consoleTool);
    } else {
      setIsUserChecked(forbidden);
    }
  }, [user, projects]);

  const splitData = async (data) => {
    const [fetchProject, fetchUser] = data.split('///');

    const matchingProject = projects.find((project) => project.id === fetchProject);
    if (matchingProject) {
      console.log(matchingProject);
      const matchingApplicant = matchingProject.applicants.applicantData.find((applicant) => applicant.id === fetchUser);
      if (matchingApplicant) {
        console.log(matchingApplicant);
        const applicantRef = doc(db, 'ProjectData', matchingProject.id, 'Data', 'applicantData');
        await setDoc(applicantRef, {
          applicantData: matchingProject.applicants.applicantData.map((applicant) =>
            applicant.id === fetchUser ? { ...applicant, checked: true } : applicant
          )
        }, { merge: true });
        console.log('Applicant checked updated successfully');
        // 応募者のcheckedプロパティを更新した後の処理を追加してください
      } else {
        console.log('Matching applicant not found');
        // 対応する応募者が見つからなかった場合の処理を追加してください
      }
    } else {
      console.log('Matching project not found');
      // 対応するプロジェクトが見つからなかった場合の処理を追加してください
    }
  };

  const onClick = (data) => {
    splitData(data)
    setReload(!reload)
  }

  const consoleTool = (<>
    {projects.map((project) => (
      <>
        <Col xs="6" key={project.id} style={{ marginBottom: "20px" }}>
          <Accordion key={project.id}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header >
              <p style={project.applicants && project.applicants.applicantData.some(applicant => !applicant.checked) ? { color: 'red', margin: '0', fontWeight: '600' } : { margin: '0' }}>{project.id}</p>

              </Accordion.Header>
              <Accordion.Body style={{ fontSize: "small", fontWeight: "400" }}>
                {project.applicants && project.applicants.applicantData.length > 0 ? (
                  project.applicants.applicantData.map((applicant) => (
                    // applicant.checkedがtrueの場合はdiv要素を表示しない
                    applicant.checked ? null : (
                      <div key={applicant.id} style={{ border: "solid gray 1px", borderRadius: "10px", padding: "5px", marginBottom: "5px" }}>
                        <p>Email: {applicant.email}</p>
                        <p>ID: {applicant.id}</p>
                        <RedirectButton buttonRabel={"完了"} onClick={() => onClick(`${project.id}///${applicant.id}`)}></RedirectButton>
                      </div>
                    )
                  ))
                ) : (
                  <></>
                )}
              </Accordion.Body>

            </Accordion.Item>
          </Accordion>
        </Col>
      </>
    ))}
  </>)

  const forbidden = (
    <>
      <Button onClick={() => toHome()}>
        HomePage
      </Button>
    </>
  );

  return (
    <div className='Check' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header />
      </div>
      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }}>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
            <Row>
              {isUserChecked}
            </Row>
          </Col>
        </Row>
      </Container>

      <div className='FooterWrapper' style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  )
}

export default CheckApplicants