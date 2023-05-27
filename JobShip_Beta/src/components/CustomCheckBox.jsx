import React, { useState } from 'react'
import { FormCheck, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const CustomCheckBox = ({ action, checked, defaultValue }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <Container fluid style={{ padding: "0" }}>
      <Row>
        <Col xs="auto">
          <FormCheck
            type="checkbox"
            value={inputValue}
            {...action}
            defaultChecked={checked}
            defaultValue={defaultValue}
          />
        </Col>
        <Col xs="auto">
          <FormControl
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="職種を入力"
          />
        </Col>
      </Row>

    </Container>
  )
}

export default CustomCheckBox
