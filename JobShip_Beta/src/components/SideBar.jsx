import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useViewport } from 'react-viewport-hooks'
import { useState, useEffect } from 'react'


/** @jsxImportSource @emotion/react */

const SideBar = () => {

  // ビューポートの幅と高さを取得
  const width = useViewport().vw;
  const height = useViewport().vh;
  const [aspect, setAspect] = useState("")

  const [iconWidth, setIconWidth] = useState("")
  const [logoHeight, setLogoHeight] = useState("")
  const [containerWidth, setContainerWidth] = useState("")

  useEffect(() => {
    setIconWidth(width / 40)
    setLogoHeight(width / 40)
    setContainerWidth(width / 6)
  }, [width])

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
  `

  const JRIconStyle = css`
    padding: 0;
    width: ${iconWidth}px;
    margin-right: 5px;
  `

  const JRLogoStyle = css`
    height: ${logoHeight}px;
  `

  const iconStyle = css`
    fill: #fdfdfd;
    height: 30px;
    width: 30px;
  `

  const textStyle = css`
    line-height: 40px;
    margin: 0;
  `

  const JobRecord_Icon = {
    imgAddress: "/JobRecord_icon.png"
  };

  const JobRecord_Logo = {
    imgAddress: "/JobRecord_LogoRE.png"
  };

  const houseSVG = "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"



  return (
    <div css={css`
      position: fixed;
      margin: 0;
      padding: 0;
      padding-top: 10px;
      width: ${containerWidth}px;
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
        <Row>
          <Col>
            <button css={JRButtonStyle}>
              <Row>
                <Col xs="2">
                </Col>
                <Col>
                  <p css = {textStyle}>ホーム</p>
                </Col>
              </Row>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SideBar