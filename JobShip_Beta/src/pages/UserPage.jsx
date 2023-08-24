// 必要なReactコンポーネントとライブラリをインポート
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap'; // react-bootstrapコンポーネントをインポート
import { useViewport } from 'react-viewport-hooks';
import { css } from '@emotion/react'

/** @jsxImportSource @emotion/react */

// コンポーネントをインポート
import SideBar from '../components/SideBar';
import RedirectButton from '../components/RedirectButton';
import Loading from '../components/Loading';

// 関連ページをインポート
import NewCarrerPage from './NewCareerPage';
import NewProfilePage from './NewProfilePage';
import ReCareerPage from './ReCareerPage';

// スタイルをインポート

// ホームページコンポーネントの定義
const UserPage = () => {
  // ユーザーデータを取得
  const profileData = getUserData('profile');
  const careerData = getUserData('career');
  const recordData = getUserData('record');
  const accountData = getUserData('account');
  const googleData = getUserData();

  // ビューポートの幅と高さを取得
  const width = useViewport().vw;
  const height = useViewport().vh;
  const [aspect, setAspect] = useState("")

  // ロケーションを取得
  const location = useLocation();

  // 認証情報を取得
  const [user, loading] = useAuthState(auth);
  const [otheruser, setOtheruser] = useState("");

  // フォントサイズを管理するステート
  const [NameSize, setNameSize] = useState('12px');
  const [nameESize, setNameESize] = useState('6px');
  const [CareerSize, setCareerSize] = useState('6px');
  const [RecordSize, setRecordSize] = useState('6px');

  // 他ユーザーページを表示するかどうかを管理するステート
  const [displayOtherPage, setDisplayOtherPage] = useState(false);

  // 他ユーザーのプロフィール、経歴、レコードデータを管理するステート
  const [otherProfile, setOtherProfile] = useState(null);
  const [otherCareer, setOtherCareer] = useState(null);
  const [otherRecord, setOtherRecord] = useState(null);
  const otherGoogle = getUserData(null, otheruser);
  const otherImg = otherGoogle?.photoURL;


  // ウィンドウの幅に応じてフォントサイズを設定
  useEffect(() => {
    setAspect(width / height)
    console.log(width)
  }, [width]);

  // ページがロードされた際の処理
  useEffect(() => {
    if (!loading && user === null) {
      const urlSearchParams = new URLSearchParams(location.search);
      const uidParam = urlSearchParams.get('uid');

      if (uidParam) {
        // URLのuidパラメータが存在する場合、該当するユーザーのデータを表示
        setOtheruser(uidParam);
      } else {
        // URLのuidパラメータが存在しない場合、未ログインユーザーにリダイレクト
        navigate('/SignupPage');
      }
    }
  }, [user, loading, location]);

  // ユーザーデータを更新
  const userDataRef = useRef({});

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
      const url = new URL(window.location.href);
      url.searchParams.set('uid', uid);
      window.history.replaceState(null, '', url.toString());
    }
  }, [user]);

  // URLパラメータに基づいて他ユーザーページを表示するか判定
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const uidParam = urlSearchParams.get('uid');
    if (uidParam && uidParam !== userDataRef.current.uid) {
      setDisplayOtherPage(true);
      setOtheruser(uidParam);
    } else {
      setDisplayOtherPage(false);
    }

    if (uidParam && uidParam !== userDataRef.current.uid && !loading) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('uid', uidParam);
      window.history.replaceState(null, '', newUrl.toString());
    }
  }, [location, userDataRef.current.uid, loading]);

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

  const navigate = useNavigate()

  const toReProfile = () => {
    navigate('/ReProfile')
  }

  const toReCareer = () => {
    navigate('/ReProfile')
  }

  const toReRecord = () => {
    navigate('/ReRecord')
  }

  const sideBarColStyle = css`
    background-color: #093143;
    padding: 0;
    display: flex;
    height: ${height * 1.2}px;
    position: fixed;
  `

  const profileWidgetStyle = css`
    margin-top: 50px;
    margin-left: ${width * 0.07}px;
    margin-right: ${width * 0.07}px;
    height: ${height * 0.58}px;
    background-color: white;
    border-radius: 10px;
    position: relative;
 `

  const thumbNailStyle = css`
    height:60%;
    z-index: -1;
    border-radius:10px 10px 0 0 ;
    background-image: url("https://i.ytimg.com/vi/Gtku_jsNgAA/maxresdefault.jpg");
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: auto;
  `

  const profileImgWrapperStyle = css`
    height: 30%;
    aspect-ratio: 1 / 1;
    background-color: white;
    position: absolute;
    top:45%;
    left:5%;
    border-radius: 10px;
    padding: 5px;
  `

  const profileImageStyle = css`
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #f0f0f0;
  `

  const nameTextStyle = css`
    font-size: 36px;
    padding-left: 10px;
    font-weight: 200;
    color: #5D526E;
  `

  const nameETextStyle = css`
    font-size: 18px;
    padding-left: 10px;
    color: #5D526E;
  `

  const badgeStyle = css`
    padding-right: 0;
    padding-top: 10px;
  `

  const commentStyle = css`
    margin: 0;
    margin-top: 10px;
    margin-left: 5%;
  `

  const widgetStyle = css`
  margin-top: 50px;
  margin-left: ${width * 0.07}px;
  margin-right: ${width * 0.07}px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  padding: 20px;
`

  // プロフィール、経歴、レコードのデータがロードされていない場合はローディングを表示
  if (!profileData && !otherProfile) {
    return (
      <Container>
        <Row>
          <Col xs={{ offset: "4", span: "4" }} style={{ textAlign: "center", marginTop: "40vh" }}>
            <Loading />
          </Col>
        </Row>
      </Container>
    );
  }

  // ホームページの表示
  if (aspect > 1.2) {
    return (
      <Container fluid >
        <Row>
          <Col xs={{ span: 2 }} css={sideBarColStyle}>
            <SideBar />
          </Col>
          <Col xs={{ span: 8, offset: 2 }} style={{ backgroundColor: "#F0F0F0" }}>
            {displayOtherPage ? (
              <>
                {/* 他ユーザーページの表示 */}
                {/* プロフィール */}
                <Row className="ProfileW" css={profileWidgetStyle}>
                  {otherProfile && (
                    <>
                      <Container>

                        <Row>
                          {/* 名前と職業 */}
                          <Col className="NameSocialW" xs={6}>
                            <Row className="Name" style={{ fontSize: NameSize, fontWeight: "700" }}>
                              <Col xs="auto">{
                                otherProfile.familyName}
                              </Col>
                              <Col xs="auto" style={{ padding: 0 }}>
                                {otherProfile.firstName}
                              </Col>
                            </Row>
                            {/* 英語名 */}
                            <Row className="NameE" style={{ fontSize: nameESize }}>
                              <Col xs="auto">{otherProfile.familyNameE}</Col>
                              <Col xs="auto" style={{ padding: 0 }}>
                                {otherProfile.firstNameE}
                              </Col>
                            </Row>
                            {/* 職業 */}
                            <Row className="Social">
                              {Array.isArray(otherProfile.job) ? (
                                otherProfile.job.map((job, index) => (
                                  <Col md="auto" css={badgeStyle} key={index}>
                                    <Badge key={index} variant="success">
                                      {job}
                                    </Badge>
                                  </Col>
                                ))
                              ) : (
                                <Col md="auto">
                                  <Badge variant="success">{otherProfile.job}</Badge>
                                </Col>
                              )}

                              <Col md="auto" css={badgeStyle}>
                                <Badge variant="success">{otherProfile.customJob}</Badge>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: '10px' }}>
                          <Col md="9"></Col>
                          <Col md="3" style={{ textAlign: 'right' }}>
                          </Col>
                        </Row>
                      </Container>
                    </>
                  )}
                </Row>

                {/* 資格 */}
                <Row className="CareerW" css = {widgetStyle}>
                  <Container>
                    <Row>
                      <p css={css`font-size:x-large; font-weight:bold`} style={{ fontSize: 'x-large', fontWeight: 'bold' }}>資格</p>
                    </Row>
                    <Row style={{ fontSize: CareerSize }}>
                      {otherCareer &&
                        otherCareer.map((data, index) => (
                          <Row key={index}>
                            <Col md={3}>
                              {data.year}年 {data.month}月
                            </Col>
                            <Col md="auto" style={{ overflowWrap: 'break-word' }}>
                              {data.description}
                            </Col>
                          </Row>
                        ))}
                    </Row>
                    <Row style={{ paddingTop: '10px' }}>
                      <Col md="9"></Col>
                      <Col md="3" style={{ textAlign: 'right' }}>
                      </Col>
                    </Row>
                  </Container>
                </Row>

                {/* レコード */}
                <Row className="RecordW" style={{ border: 'solid 1px #c7c7c7', backgroundColor: 'white', borderRadius: '4px', marginTop: '50px', padding: '20px' }}>
                  <Container>
                    <Row>
                      <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>レコード</p>
                    </Row>
                    <Row>
                      {otherRecord &&
                        otherRecord.map((data, index) => (
                          <Accordion key={index}>
                            <Accordion.Item eventKey={index.toString()} key={index}>
                              <Accordion.Header>
                                <Col md={3} style={{ fontSize: RecordSize, fontWeight: '500' }}>
                                  {data.year}年 {data.month}月
                                </Col>
                                <Col md={8} style={{ fontSize: RecordSize, overflowWrap: 'break-word', fontWeight: '500' }}>
                                  {data.description}
                                </Col>
                              </Accordion.Header>
                              <Accordion.Body style={{ fontWeight: '500' }}>{makeLine(data.detail)}</Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ))}
                    </Row>
                    <Row style={{ paddingTop: '10px' }}>
                      <Col md="9"></Col>
                      <Col md="3" style={{ textAlign: 'right' }}>
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </>
            ) : (
              <>
                {/* ユーザーページの表示 */}
                {/* プロフィール */}
                <Row className="ProfileW" css={profileWidgetStyle}>
                  {profileData && (
                    <>
                      <Container >

                        {/* サムネイル画像 */}
                        <Row css={thumbNailStyle}>
                        </Row>

                        {/* プロフィール画像 */}
                        <Row css={profileImgWrapperStyle}>
                          <img src='https://pbs.twimg.com/profile_images/848343638790684672/f4Q-3H3S_400x400.jpg' css={profileImageStyle}></img>
                        </Row>

                        {/* 名前と職業 */}
                        <Row className="Name" >
                          <Col xs={{ offset: "3", span: "auto" }} css={nameTextStyle}>
                            {profileData.familyName}
                          </Col>
                          <Col xs="auto" css={nameTextStyle}>
                            {profileData.firstName}
                          </Col>

                          {/*{Array.isArray(profileData.job) ? (
                            profileData.job.map((job, index) => (
                              <Col xs="auto" css={badgeStyle} key={index}>
                                <Badge key={index} variant="success">
                                  {job}
                                </Badge>
                              </Col>
                            ))
                          ) : (
                            <Col md="auto">
                              <Badge variant="success">{profileData.job}</Badge>
                            </Col>
                          )}

                          <Col md="auto" css={badgeStyle}>
                            <Badge variant="success">{profileData.customJob}</Badge>
                          </Col>*/}
                        </Row> 

                        {/* 英語名 */}
                        <Row className="NameE" >
                          <Col xs={{ offset: "3", span: "auto" }} css={nameETextStyle}>
                            {profileData.familyNameE}
                          </Col>
                          <Col xs="auto" css={nameETextStyle}>
                            {profileData.firstNameE}
                          </Col>
                        </Row>

                        <Row>
                        <Col xs={{ span: "10" }} >
                        {profileData.comment ? (
                        <p css = {commentStyle}>
                          {profileData.comment}
                        </p>
                        ):(
                          <>
                          </>
                        )
                      }
                        </Col>
                        </Row>

                        <Row style={{ paddingTop: '10px' }}>
                          <Col md="9"></Col>
                          <Col md="3" style={{ textAlign: 'right' }}>
                            <RedirectButton buttonRabel="編集" onClick={() => toReProfile()} />
                          </Col>
                        </Row>
                      </Container>
                    </>
                  )}
                </Row>

                {/* 資格 */}
                <Row className="CareerW" css = {widgetStyle}>
                  <Container>
                    <Row>
                      <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>資格</p>
                    </Row>
                    <Row style={{ fontSize: CareerSize }}>
                      {careerData &&
                        careerData.map((data, index) => (
                          <Row key={index}>
                            <Col md={3}>
                              {data.year}年 {data.month}月
                            </Col>
                            <Col md="auto" style={{ overflowWrap: 'break-word' }}>
                              {data.description}
                            </Col>
                          </Row>
                        ))}
                    </Row>
                    <Row style={{ paddingTop: '10px' }}>
                      <Col md="9"></Col>
                      <Col md="3" style={{ textAlign: 'right' }}>
                        <RedirectButton buttonRabel="編集" onClick={() => toReCareer()} />
                      </Col>
                    </Row>
                  </Container>
                </Row>
                
                {/* レコード */}
                <Row className="RecordW" css = {widgetStyle}>
                  <Container>
                    <Row>
                      <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>レコード</p>
                    </Row>
                    <Row>
                      {recordData &&
                        recordData.map((data, index) => (
                          <Accordion key={index}>
                            <Accordion.Item eventKey={index.toString()} key={index}>
                              <Accordion.Header>
                                <Col md={3} style={{ fontSize: RecordSize, fontWeight: '500' }}>
                                  {data.year}年 {data.month}月
                                </Col>
                                <Col md={8} style={{ fontSize: RecordSize, overflowWrap: 'break-word', fontWeight: '500' }}>
                                  {data.description}
                                </Col>
                              </Accordion.Header>
                              <Accordion.Body style={{ fontWeight: '500' }}>{makeLine(data.detail)}</Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ))}
                    </Row>
                    <Row style={{ paddingTop: '10px' }}>
                      <Col md="9"></Col>
                      <Col md="3" style={{ textAlign: 'right' }}>
                        <RedirectButton buttonRabel="編集" onClick={() => toReRecord()} />
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </>
            )}
          </Col>
          <Col xs={{ span: '2' }} style={{ backgroundColor: '#e0e0e0' }}>

          </Col>
        </Row>
      </Container>
    )
  }
};

export default UserPage;
