import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Modal, Row, Col, Container } from 'react-bootstrap'
import { css } from '@emotion/react'
import { Pen } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { collection, getFirestore, addDoc, setDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { DateTime } from 'luxon'

import { getUserData } from '../Firebase'
import { db } from '../Firebase'
import { auth } from '../Firebase'

import Form from './Form'
import CheckBox from './CheckBox'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import ImageCropper from './ImageCropper'

/** @jsxImportSource @emotion/react */

const WriteButton = () => {

  const [timeLineData, setTimeLineData] = useState([{}])
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)

  const { register, handleSubmit, formState: { errors }, unregister } = useForm();

  const userDataRef = useRef({});
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  const savedTimeLineData = getUserData('timeLine')
  

  //タイムライン作成が初めてか否かのフラグ
  const [isTimeLineWrited, setIsTimeLineWrited] = useState(true)

  
  //タイムライン作成が初めてか否かを判定し、sideBarのpropsに送信
  useEffect(() => {
    if(!savedTimeLineData){
      setIsTimeLineWrited(false)
      console.log("this is first timeline")
    }
    else{
      setIsTimeLineWrited(true)
      console.log("this is not first timeline")
    }
  }, [savedTimeLineData])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const onSubmit = async (e) => {
    const timestamp = DateTime.now(); // タイムスタンプを取得
    const formattedTimestamp = timestamp.toFormat('yyyy-MM-dd HH:mm:ss'); // カスタムフォーマットで文字情報に変換
    const serverTimeStamp = new serverTimestamp()
    const comment = ""
    const favorite = 0
    console.log(serverTimeStamp)
    const data = {...e, serverTimeStamp,comment,favorite}
    const formData = { [formattedTimestamp]:data }
    console.log(formData)
    if(!isTimeLineWrited){
      await setDoc(doc(db, "UserData", userDataRef.current.uid, "Data", `timeLineData`), {
        formData
      })
    }
    else {
      await setDoc(doc(db, "UserData", userDataRef.current.uid, "Data", `timeLineData`), {
        formData
      },{merge:true})
    }
  };

  const writeButtonStyle = css`
    background-color: white;
    border: none;
    border-radius: 20px;
    width: 100%;
    height: 100;
    padding-top:  10px;
    padding-bottom: 10px;
    text-align: center;
  `

  const writeButtonTextStyle = css`
    display: inline-block;
    margin-left: 10%;
    margin-bottom: 0;
  `

  const submitButtonStyle = css`
    border: none;
    background-color: #6A37AD;
    color: #fdfdfd;
    border-radius: 5px;
  `

  const textRowStyle = css`
    margin-bottom:  20px;
  `

  return (
    <div>

      <button css={writeButtonStyle} onClick={() => setShowModal(true)}>
        <Pen />
        <p css={writeButtonTextStyle}>記録を書く</p>
      </button>

      <Modal show={showModal} onHide={handleCloseModal} size='lg'>
        <form onSubmit={handleSubmit(onSubmit)}>

        <Modal.Header closeButton>
          <Modal.Title>
            新規投稿
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            
              <Row css={textRowStyle}>
                <TextInput placeHolder={"タイトル"} action={register(`title`)} />
              </Row>

              <Row>
                <p>
                  タグを選択
                </p>
              </Row>

              <Row>
                <TextareaInput placeHolder={"詳細を入力"} action={register('detail')} />
              </Row>

              <Row>
                <Col xs="2">
                  <ImageCropper setImage={setImage} />
                </Col>
              </Row>

              <Row>
                <img src={imgSrc}></img>
              </Row>

          </Container>
        </Modal.Body>

        <Modal.Footer>
          <CheckBox label={" レコードに登録する"} />
          <button variant="primary" onClick={handleCloseModal} css={submitButtonStyle}>
            投稿する
          </button>
        </Modal.Footer>
        </form>
      </Modal>

    </div>

  )
}

export default WriteButton