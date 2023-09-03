import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useViewport } from 'react-viewport-hooks'
import { useState, useEffect } from 'react'
import { House, Pen, Clock } from 'react-bootstrap-icons'

import WriteButton from './WriteButton'

/** @jsxImportSource @emotion/react */

const SideBar = ({}) => {

  // ビューポートの幅と高さを取得
  const width = useViewport().vw;
  const height = useViewport().vh;
  const [aspect, setAspect] = useState("")

  const [JRIconWidth, setJRIconWidth] = useState(25)
  const [JRLogoHeight, setJRLogoHeight] = useState(25)
  const [iconSize, setIconSize] = useState(20)
  const [containerWidth, setContainerWidth] = useState(200)

  useEffect(() => {
    setJRIconWidth(width / 50)
    setJRLogoHeight(width / 50)
    setContainerWidth(width / 6)
    setIconSize(width / 60)
  }, [width,height])
  

  const containerStyle = css`
    width: ${containerWidth}px;
    padding-left: 8px;
  `

  const JRButtonStyle = css`
    background: none;
    border: none;
    color: #FDFDFD;
    padding: 0;
    height: 100%;
    width: 100%;
    margin-top: 5px;
    margin-left: 5px;
    text-align: left;
  `

  const JRIconStyle = css`
    padding: 0;
    width: ${JRIconWidth}px;
    margin-right: 5px;
  `

  const JRLogoStyle = css`
    height: ${JRLogoHeight}px;
  `

  const borderStyle = css`
    border-bottom: 2px solid #B497B5;
    margin-top: 20px;
    margin-left: ${iconSize/5}px;
    margin-right: ${iconSize/5}px;
    margin-bottom: 20px;
    border-radius: 1px;
  `

  const buttonStyle = css`
    background: none;
    border: none;
    color: #FDFDFD;
    margin-bottom: ${iconSize}px;
    display: block;
  `

  const textStyle = css`
    margin: 0;
    display: inline-block;
    font-size: 16px;
  `

  const JobRecord_Icon = {
    imgAddress: "/JobRecord_icon.png"
  };

  const JobRecord_Logo = {
    imgAddress: "/JobRecord_LogoRE.png"
  };

 
  return (
    <div css={css`
      position: fixed;
      margin: 0;
      padding: 0;
      padding-top: 10px;
      width: ${containerWidth}px;
      height: ${height}px;
    `}>
      <Container css={containerStyle}>
        <Row>
          <Col>
            <button css={JRButtonStyle}>
              <img src={JobRecord_Icon.imgAddress} css={JRIconStyle}></img>
              <img src={JobRecord_Logo.imgAddress} css={JRLogoStyle}></img>
            </button>
          </Col>
        </Row>

        <Row  css = {borderStyle}>  
        </Row>

        <Row>
          <Col xs = {{ span:"11", offset:"1" }}>

            <button css={buttonStyle}>
              <Row>
                <Col xs = "auto">
                  <House size={iconSize} />
                </Col>
                <Col xs = "auto">
                <p css = {textStyle}>ホーム</p>
                </Col>
              </Row>
            </button>

            <button css={buttonStyle}>
              <Row>
                <Col xs = "auto">
                  <Clock size={iconSize} />
                </Col>
                <Col xs = "auto">
                <p css = {textStyle}>タイムライン</p>
                </Col>
              </Row>
            </button>

            <button css={buttonStyle}>
              <Row>
                <Col xs = "auto">
                  <Pen size={iconSize} />
                </Col>
                <Col xs = "auto">
                <p css = {textStyle}>マイページ</p>
                </Col>
              </Row>
            </button>
          </Col>
          
          <WriteButton />
        </Row>
      </Container>
    </div>
  )
}

export default SideBar