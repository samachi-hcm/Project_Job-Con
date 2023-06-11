import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../Firebase';
import { useViewport } from 'react-viewport-hooks';
import { v4 as uuidv4 } from 'uuid';


//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import ProfileInput from '../components/ProfileInput'
import RedirectButton from '../components/RedirectButton';
import Stepper from '../components/Stepper';
//linked page

//styles

const NewProfilePage = () => {

  const [user, loading] = useAuthState(auth)
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [savedData, setSavedData] = useState()
  const userDataRef = useRef({});
  const [isUser, setIsUser] = useState(null)
  const [ExplainSize, setExplainSize] = useState("12px")
  const width = useViewport().vw
  const height = useViewport().vh

  let aspect = width / height

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "UserData", userDataRef.current.email, 'Data', `profileData`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSavedData(saveShot)
          setIsUser(true)
        }else{
          setIsUser(false)
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    
    console.log(aspect)
    if (aspect < 1) {
      setExplainSize('40px') ; // スマートフォン向けのフォントサイズ
    } else if (aspect < 1.5) {
      setExplainSize('16px') ; // タブレット向けのフォントサイズ
    } else {
      setExplainSize('25px') ; // デスクトップ向けのフォントサイズ
    }
  }, [width])
  
  const navigate = useNavigate();

  const toNewCareer = async() => {
    const formData = [{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""},{title:"",anser:""}]
    await setDoc(doc(db, "UserData", userDataRef.current.email, "Data", `sheetData`), {
      formData,
    });
    navigate('/NewCareerPage')
  }

  const onSubmit = async (formData) => {
    console.log(formData)
    const userId = uuidv4()
    userDataRef.current = { ...userDataRef.current, formData }
    await setDoc(doc(db, "UserData", userDataRef.current.email, "Data", `profileData`), {
      formData,
      userId
    });
    toNewCareer()
  };

  useEffect(() => {
    console.log(isUser)
    if(isUser === true){
      navigate('/')
    }
  }, [isUser])
  


  return (
    <div className='NewProfilePage' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper' >
        <Header1 />
      </div>

      <Container style={{ marginTop: "30px" }}>
        <Row >
          <Col xs={{ span: 6, offset: 3 }}>
            <Stepper nowStep={1} />
          </Col>
        </Row>
      </Container>

      <div className='MainWrapper' style={{ flexGrow: 1 }}>
        <Container fluid>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} md={{ span: 9, offset: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{marginBottom:"30px"}}>
                  <p style={{marginTop:"30px", fontSize:ExplainSize, paddingLeft:"20px"}}>あなたの経験データベース<br />『レコード』の設計を開始します。<br />あなたの情報を教えてください。</p>
                  <ProfileInput
                    testAction="test"
                    familyName={register(`familyName`, { required: '姓の入力は必須です' })}
                    firstName={register(`firstName`, { required: '名の入力は必須です' })}
                    familyNameE={register(`familyNameE`)}
                    firstNameE={register(`firstNameE`)}
                    gender={register(`gender`)}
                    birthDay={register(`birthDay`, { required: '生年月日の入力は必須です' })}
                    customJob={register(`customJob`)}
                    job={register(`job`)} 
                    savedData={savedData}
                    isUser={isUser}
                    errors={errors}
                  />
                </Row>
                <Row>
                  <Col xs={{ span: 4, offset: 8 }} style={{ textAlign: "right" }}>
                    <RedirectButton buttonRabel="次へ" />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewProfilePage