import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import DeleteButton from './DeleteButton';
import NewCareerPage from './Forms'; // NewCareerPageのインポートが未使用のため削除しています

const Form = ({ year, month, description, detail, savedData, mode, deleteForm, form, errors }) => {

  // 改行文字を置換するユーティリティ関数
  const makeLine = (data) => {
    if (data) {
      const lines = data.split("¥n"); // ここは改行文字を正しく指定する必要があります（¥n -> \n）
      return lines.join("\n");
    } else {
      return "";
    }
  };

  // レコードモードのチェックと詳細エリアの表示
  const recordCheck = (mode) => {
    if (mode === "record") {
      return (
        <div className='DetailInput'>
          <TextareaInput action={detail} defaultValue={makeLine(savedData?.detail)} />
        </div>
      );
    } else {
      return null;
    }
  };

  const inputWrapperStyle = mode === "record" ? "375px" : "150px";

  return (
    <Container className='Form' style={{ border: "solid 1px #c7c7c7", backgroundColor: "white", borderRadius: "4px", height: inputWrapperStyle, margin: "auto", position: "relative" }}>
      {/* 削除ボタン */}
      <DeleteButton onClick={() => deleteForm(form)} style={{ position: "absolute", top: 0, right: 0 }} />

      <Row style={{ marginTop: "20px" }}>
        <Col xs="8">
          <Row>
            <Col xs="4" style={{ display: "flex" }}>
              {/* 年の入力フィールド */}
              <div style={{ width: "70%" }} >
                <TextInput placeHolder="2023" action={year} defaultValue={savedData?.year} />
              </div>
              <p style={{ margin: "5px" }}>年</p>
            </Col>
            <Col xs="4" style={{ display: "flex" }}>
              {/* 月の入力フィールド */}
              <div style={{ width: "70%" }} >
                <TextInput placeHolder="4" action={month} defaultValue={savedData?.month} />
              </div>
              <p style={{ margin: "5px" }}>月</p>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: "10px" }}>
        <Col className='DescriptionInput'>
          {/* タイトルの入力フィールド */}
          <TextInput placeHolder="タイトルを入力" action={description} defaultValue={savedData?.description} />
        </Col>
      </Row>

      <Row style={{ marginTop: "10px" }}>
        <Col className='DetailInput'>
          {/* レコードモードの詳細エリア */}
          {recordCheck(mode)}
        </Col>
      </Row>
    </Container>
  )
}

export default Form;
