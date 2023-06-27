import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db, storage } from '../Firebase';
import { Container, Row, Col, Carousel, Badge, Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';


//components
import Header1 from '../components/Header1';
import Footer from '../components/Footer';
import RedirectButton from '../components/RedirectButton';
import CheckBox from '../components/CheckBox';

//linked pages
import NewCarrerPage from './NewCareerPage';
import NewProfilePage from './NewProfilePage';
import ReCareerPage from './ReCareerPage';
import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';

const Console = ({ allowedUser }) => {
  const [index, setIndex] = useState(0);
  const [user, loading] = useAuthState(auth);
  const userDataRef = useRef({});
  const [data, setData] = useState();
  const [isUserChecked, setIsUserChecked] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const [fileData1, setFileData1] = useState(null)
  const [fileData2, setFileData2] = useState(null)
  const [fileData3, setFileData3] = useState(null)

  const handleFile1Change = (event) => {
    const file = event.target.files[0];
    setFileData1(file)
    // ファイルの処理
  };

  const handleFile2Change = (event) => {
    const file = event.target.files[0];
    setFileData2(file)
    // ファイルの処理
  };

  const handleFile3Change = (event) => {
    const file = event.target.files[0];
    setFileData3(file)
    // ファイルの処理
  };

  const toHome = () => {
    navigate('/');
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleShowModal3 = () => {
    setShowModal3(true);
  };

  const handleCloseModal3 = () => {
    setShowModal3(false);
  };

 // Consoleコンポーネント内のonSubmit関数
const onSubmit = async (data) => {
  data.description = data.description.replace(/\n/g, '¥n');
  data.require = data.require.replace(/\n/g, '¥n');
  data.award = data.award.replace(/\n/g, '¥n');
  data.place = data.place.replace(/\n/g, '¥n');
  console.log(data)

  try {
    const file1 = fileData1;
    const file2 = fileData2;
    const file3 = fileData3;

    // ファイルが選択されているか確認
    if (file1) {
      const storageRef = ref(storage, `/Project/${data.id}/icon/img0.png`);
      await uploadBytes(storageRef, file1);
      console.log('ファイル1がアップロードされました');
    }

    if (file2) {
      const storageRef = ref(storage, `/Project/${data.id}/main/img0.png`);
      await uploadBytes(storageRef, file2);
      console.log('ファイル2がアップロードされました');
    }

    if (file3) {
      const storageRef = ref(storage, `/Project/${data.id}/manager/img0.png`);
      await uploadBytes(storageRef, file3);
      console.log('ファイル3がアップロードされました');
    }

    await setDoc(doc(db, `/ProjectData/${data.id}/Data/projectData`), {
      data
    });
  } catch (error) {
    console.error('データの送信中にエラーが発生しました', error);
  }
};

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
  }, [user]);


  const consoleTool = (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
          <Row>
            <Col xs="2">
              <TextInput placeHolder={"記事ID"} action={register(`id`)} />
            </Col>
            <Col style={{ fontSize: 'x-large' }} xs={{ offset: "1", span: "8" }}>
              <TextInput placeHolder={"記事タイトル"} action={register(`title`)} />
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs="auto">
              <Button
                style={{ height: "45px", width: "45px", border: "none", fontSize: "xx-small" }}
                onClick={() => handleShowModal1()}
              >アイコン</Button>

            </Col>
            <Col xs="auto">
              <TextInput placeHolder={"企業名"} action={register(`companyName`)} />
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  alt="First slide"
                  src="https://via.placeholder.com/800x400?text=Carousel+Image+1"
                />
              </Carousel.Item>
              <Carousel.Caption>
                <Button onClick={handleShowModal2}>画像を選択</Button>
              </Carousel.Caption>
            </Carousel>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col xs="8">
            <Row>
              <Col xs="auto" style={{ paddingLeft: "0"}}>
                <CheckBox label="営業" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="企画" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="人事" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="タレント" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="エンジニア" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="デザイナー" action={register(`tag`)} />
              </Col>
              <Col xs="auto" style={{ paddingLeft: "0" }}>
                <CheckBox label="クリエイター" action={register(`tag`)} />
              </Col>
            </Row>
            </Col>
          </Row>
          <Row>
            <Col xs="8" >
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>プロジェクト概要</p>
              <TextareaInput placeHolder={"テキスト"} action={register(`description`)} />
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "60px" }}>募集要件</p>
              <TextareaInput placeHolder={"テキスト"} action={register(`require`)} />
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>報酬</p>
              <TextareaInput placeHolder={"テキスト"} action={register(`award`)} />
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>勤務地</p>
              <TextareaInput placeHolder={"テキスト"} action={register(`place`)} />
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>私たちについて</p>
              <TextareaInput placeHolder={"テキスト"} action={register(`aboutUs`)} />
              <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>Googleフォームのアドレス(非表示)</p>
              <TextInput placeHolder={""} action={register(`form`)} />
            </Col>
            <Col style={{ border: "solid 1px #c7c7c7", backgroundColor: "white", borderRadius: "4px", marginTop: "50px", padding: "20px" }}>
              <Row>
                <Col xs={{ offset: "1", span: "10" }} style={{ textAlign: "center", padding: "0" }}>
                  <p style={{ fontSize: "large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px" }}>プロジェクト責任者</p>
                  <div style={{ width: "140px", height: "140px", overflow: 'hidden', borderRadius: "50%", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}>
                    <Button style={{ width: "100%", height: "100%", objectFit: 'cover', borderRadius: "50%", border: "none" }} onClick={handleShowModal3} >責任者</Button>
                  </div>
                  <Row style={{ marginTop: "5px" }}>
                    <TextInput placeHolder={"責任者名"} action={register(`managerName`)} />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <TextInput placeHolder={"役職名"} action={register(`positionName`)} />
                  </Row>

                  <p style={{ fontSize: "small", textAlign: "left", overflowWrap: "break-word" }}>責任者の概要</p>
                  <TextareaInput placeHolder={"テキスト"} action={register(`aboutManager`)} />
                </Col>
              </Row>
            </Col>
            <RedirectButton buttonRabel={"記事を作成する"} type={"submit"} />
          </Row>
        </Col>
      </Row>


    </>
  );

  const forbidden = (
    <>
      <Button onClick={() => toHome()}>
        HomePage
      </Button>
    </>
  );

  return (
    <div className='Project' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isUserChecked}
        </form>
      </Container>

      <div className='FooterWrapper' style={{ marginTop: "100px" }}>
        <Footer />
      </div>

      <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>企業アイコンを選択</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fileInput">
              <Form.Control type="file" onChange={handleFile1Change} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleCloseModal1}>
            選択
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>画像を選択</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="fileInput">
              <Form.Control type="file" onChange={handleFile2Change} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleCloseModal2}>
            選択
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal3} onHide={handleCloseModal3}>
        <Modal.Header closeButton>
          <Modal.Title>責任者の画像を選択</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="fileInput">
              <Form.Control type="file" onChange={handleFile3Change} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal3}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleCloseModal3}>
            選択
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Console;
