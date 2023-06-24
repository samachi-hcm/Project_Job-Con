import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Carousel, Badge, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';

//linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'
import ReCareerPage from './ReCareerPage';

const Project = ({ receivedId, onPage }) => {
  const [index, setIndex] = useState(0);

  const [user, loading] = useAuthState(auth);
  const userDataRef = useRef({});
  const [data, setData] = useState();
  const { id } = useParams();

  const storage = getStorage();

  const mainImgRef = ref(storage, `/Project/${receivedId ? receivedId : id}/main/img0.png`);
  const iconImgRef = ref(storage, `/Project/${receivedId ? receivedId : id}/icon/img0.png`);
  const managerImgRef = ref(storage, `/Project/${receivedId ? receivedId : id}/manager/img0.png`);


  const [mainImgUrl, setMainImgUrl] = useState('')
  const [iconImgUrl, setIconImgUrl] = useState('')
  const [managerImgUrl, setManagerImgUrl] = useState('')

  const [showModal1, setShowModal1] = useState(false);

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const navigate = useNavigate()

  const toApply = () => {
    navigate('/ApplyPage')
  }

  const apply = () =>{
    console.log("応募完了！")
    console.log(data.form)
    console.log(userDataRef.current.uid)
  }

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid }
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const projectId = receivedId ? receivedId : id;
      const docRef = doc(db, "ProjectData", projectId, "Data", "projectData");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const saveShot = docSnap.data().data;
        setData(saveShot);
      }
      console.log(projectId);
    };
    fetchData();
  }, [id, receivedId]);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const makeLine = (data) => {
    const Content =

      data.split('¥n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))

    return Content;
  };

  const shortLine = (data) => {
    const lines = data.split('¥n');
    const maxLines = 1; // 表示する最大行数
    const truncatedLines = lines.slice(0, maxLines);
    const isTruncated = lines.length > maxLines;
  
    const Content = truncatedLines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  
    if (isTruncated) {
      Content.push(
        <React.Fragment key="ellipsis">
          ...
          <br />
        </React.Fragment>
      );
    }
  
    return Content;
  };
  

  useEffect(() => {
    getDownloadURL(mainImgRef)
      .then((url) => {
        setMainImgUrl(url); // 取得したURLをステートにセット
      })
      .catch((error) => {
        console.log(error);
      });

    getDownloadURL(iconImgRef)
      .then((url) => {
        setIconImgUrl(url); // 取得したURLをステートにセット
      })
      .catch((error) => {
        console.log(error);
      });

    getDownloadURL(managerImgRef)
      .then((url) => {
        setManagerImgUrl(url); // 取得したURLをステートにセット
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mainImgRef, iconImgRef, managerImgRef]);

  if (!data) {
    console.log(data)
    return <div>Loading...</div>;
  }

  if (onPage) {
    // onPage が true の場合の表示内容
    return (
      <div className="Project" style={{ display: 'flex', flexDirection: 'column' }}>
        <Container fluid style={{ marginTop: "30px", flexGrow: 1 }}>
          <Row>
            <Col xs="12" >
              <Row>
                <Col style={{ fontSize: 'x-large' }}>
                  {data.title}
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  <img
                    src={iconImgUrl} // 取得した画像のURLを指定
                    alt="Icon image"
                    style={{ width: "75%", height: "auto" }}
                  />
                </Col>
                <Col xs="auto">
                  {data.hostName}
                </Col>
              </Row>
              <Row>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={mainImgUrl} // 取得した画像のURLを指定
                      alt="First slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col xs="8">
                  <Row>
                    {Array.isArray(data.tag) ?
                      data.tag.map((tag, index) => (
                        <Col md="auto" style={{ paddingRight: "0" }} key={index}>
                          <Badge key={index} variant="success" >
                            {tag}
                          </Badge>
                        </Col>
                      ))
                      :
                      <Col md="auto">
                        <Badge variant="success" >
                          {data.tag}
                        </Badge>
                      </Col>
                    }
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs="12" >
                  {shortLine(data.description)}
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }

  return (
    <div className='Project' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }}>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} >
            <Row>
              <Col style={{ fontSize: 'xx-large' }}>
                {data.title}
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <img
                  src={iconImgUrl} // 取得した画像のURLを指定
                  alt="Icon image"
                  style={{ width: "75%", height: "auto" }}
                />
              </Col>
              <Col xs="auto">
                {data.hostName}
              </Col>
            </Row>
            <Row>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={mainImgUrl} // 取得した画像のURLを指定
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Row>
            <Row style={{ marginTop: "30px" }}>
              <Col xs="8">
                <Row>
                  {Array.isArray(data.tag) ?
                    data.tag.map((tag, index) => (
                      <Col md="auto" style={{ paddingRight: "0" }} key={index}>
                        <Badge key={index} variant="success" >
                          {tag}
                        </Badge>
                      </Col>
                    ))
                    :
                    <Col md="auto">
                      <Badge variant="success" >
                        {data.tag}
                      </Badge>
                    </Col>
                  }
                </Row>
              </Col>
              <Col xs="4" style={{ padding: "0" }}>
                <Button style={{ width: "100%" }} onClick={() => toApply()}>応募に進む</Button>
              </Col>
            </Row>
            <Row>
              <Col xs="8" >
                <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>プロジェクト概要</p>
                {makeLine(data.description)}
                <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "60px" }}>募集要件</p>
                {makeLine(data.require)}
                <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>報酬</p>
                {makeLine(data.award)}
                <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>勤務地</p>
                {makeLine(data.place)}
              </Col>
              <Col style={{ border: "solid 1px #c7c7c7", backgroundColor: "white", borderRadius: "4px", marginTop: "50px", padding: "20px" }}>
                <Row>
                  <Col xs={{ offset: "1", span: "10" }} style={{ textAlign: "center", padding: "0" }}>
                    <p style={{ fontSize: "large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px" }}>プロジェクト責任者</p>
                    <div style={{ width: "140px", height: "140px", overflow: 'hidden', borderRadius: "50%", marginLeft: "auto", marginRight: "auto" }}>
                      <img
                        src={managerImgUrl} // 取得した画像のURLを指定
                        alt="Manager"
                        style={{ width: "100%", height: "100%", objectFit: 'cover', borderRadius: "50%" }}
                      />
                    </div>
                    <p>{data.managerName}</p>
                    <p style={{ fontSize: "small" }}>{data.hostName}<br />{data.positionName}</p>
                    <p style={{ fontSize: "small", textAlign: "left", overflowWrap: "break-word" }}>{makeLine(data.aboutManager)}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Modal show={showModal1} onHide={handleCloseModal1} >
        <Modal.Header closeButton>
          <Modal.Title>仮応募を確定する</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={()=>apply()}>
            決定
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>

      <div className='FooterWrapper' style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  )
}

export default Project
