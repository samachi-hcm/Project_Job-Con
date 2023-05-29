import React, { useState } from 'react'
import { FormCheck, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const CustomCheckBox = ({ control, name }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked)
  }

  return (
    <Container fluid style={{ padding: "0" }}>
      <Row>
        <Col xs="auto">
          <FormCheck
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckChange}
          />
        </Col>
        <Col xs="auto">
          <Controller
            name={name}
            control={control}
            render={({ field }) => 
              <FormControl
                type="text"
                {...field}
                placeholder="職種を入力"
                disabled={!isChecked}
              />}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default CustomCheckBox;
