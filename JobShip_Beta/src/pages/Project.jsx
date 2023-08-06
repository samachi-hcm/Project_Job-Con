import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Carousel, Badge, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

//components
import Header from '../components/Header'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';
import Loading from '../components/Loading';

//linked pages

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
  const [showModal2, setShowModal2] = useState(false);
  const [isApplied, setIsApplied] = useState(false)

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

  useEffect(() => {
    if (!loading && user === null) {
      navigate('/SignupPage');
    }
  }, [user, loading]);

  useEffect(() => {
    const checkIfApplied = async () => {
      if (user) {
        const applicantId = userDataRef.current.uid;
        const projectId = receivedId ? receivedId : id;

        const projectRef = doc(db, "ProjectData", projectId, "Data", "applicantData");
        const projectDataDoc = await getDoc(projectRef);

        if (projectDataDoc.exists()) {
          const applicants = projectDataDoc.data().applicantData || [];
          const isAlreadyApplied = applicants.some(applicant => applicant.id === applicantId);

          setIsApplied(isAlreadyApplied);
        } else {
          setIsApplied(false);
        }
      }
    };

    checkIfApplied();
  }, [user, receivedId, id, data]);

  const navigate = useNavigate()

  const toApply = (id) => {
    navigate(`/ApplyPage/${id}`)
  }

  const apply = async () => {
    const applicantData = { id: userDataRef.current.uid, checked: false, email: userDataRef.current.email };
    const projectId = receivedId ? receivedId : id;

    const projectRef = doc(db, "ProjectData", projectId, "Data", "applicantData");
    const projectDataDoc = await getDoc(projectRef);

    if (projectDataDoc.exists()) {
      const existingApplicants = projectDataDoc.data().applicantData || [];
      const updatedApplicants = [...existingApplicants, applicantData];

      await updateDoc(projectRef, { applicantData: updatedApplicants });
    } else {
      await setDoc(doc(db, "ProjectData", projectId, "Data", "applicantData"), {
        applicantData: [applicantData]
      });
    }
    toApply(projectId)
  };

  const cancelApply = async () => {
    const applicantId = userDataRef.current.uid;
    const projectId = receivedId ? receivedId : id;

    const projectRef = doc(db, "ProjectData", projectId, "Data", "applicantData");
    const projectDataDoc = await getDoc(projectRef);

    if (projectDataDoc.exists()) {
      const applicants = projectDataDoc.data().applicantData || [];
      const updatedApplicants = applicants.filter(applicant => applicant.id !== applicantId);

      await updateDoc(projectRef, { applicantData: updatedApplicants });
      setIsApplied(false);
    }
  };


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
        console.log(data)
      }
    };
    fetchData();
  }, [id, receivedId]);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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

  const shortLine = (data) => {
    const lines = data.split('¥n');
    const maxLines = 1; // 表示する最大行数
    const truncatedLines = lines.slice(0, maxLines);
    const isTruncated = lines.length > maxLines;

    if (lines.length === 1) {
      return data; // ¥nが存在しない場合は元のデータをそのまま返す
    }

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

  const appliedOrNot = (isApplied) => {
    if (isApplied) {
      return (<>
        <Button style={{ width: "100%" }} onClick={() => handleShowModal2()} >応募を取り消す</Button>
      </>)
    }
    else {
      return (<>
        <Button style={{ width: "100%" }} onClick={() => handleShowModal1()} >応募に進む</Button>
      </>)
    }
  }

  if (!data) {
    if (onPage) {
      return <Container>
        <Row>
          <Col xs={{ offset: "4", span: "4" }} style={{ textAlign: "center", marginTop: "10vh" }}>
            <Loading />
          </Col>
        </Row>
      </Container>;

    }
    if (!onPage) {
      return <Container>
        <Row>
          <Col xs={{ offset: "4", span: "4" }} style={{ textAlign: "center", marginTop: "40vh" }}>
            <Loading />
          </Col>
        </Row>
      </Container>;
    }
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
                <Col xs="auto" style={{ marginTop: "auto", marginBottom: "auto" }}>
                  {data.companyName}
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: "100%", height: "300px", overflow: "hidden" }}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={mainImgUrl} // 取得した画像のURLを指定
                      alt="First slide"
                      style={{ height: "300px", objectFit: 'contain' }}
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
        <Header />
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
                {data.companyName}
              </Col>
            </Row>
            <Row>
              <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: "100%", height: "400px", overflow: "hidden" }}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={mainImgUrl} // 取得した画像のURLを指定
                    alt="First slide"
                    style={{ height: "400px", objectFit: 'contain' }}
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
                {appliedOrNot(isApplied)}
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
                <p style={{ fontSize: "x-large", fontWeight: "bold", fontFamily: "Toppan BunkyuMidashiGoStd", marginBottom: "20px", marginTop: "20px" }}>私たちについて</p>
                {makeLine(data.aboutUs)}
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
            「確定」をクリックすると仮応募が完了します
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal1}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={() => apply()}>
              確定
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal2} onHide={handleCloseModal2} >
          <Modal.Header closeButton>
            <Modal.Title>応募を取り消す</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            「確定」をクリックすると仮応募を取り消します。
            <p style={{ fontSize: "x-small", marginTop: "10px" }}>*応募から時間が経過していた場合、取り消し処理が間に合わないことがございます。</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal2}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={() => cancelApply()}>
              確定
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
