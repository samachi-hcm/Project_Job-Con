import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// コンポーネントのインポート
import Form from './Form';
import RedirectButton from './RedirectButton';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';

const Forms = ({ mode, RPageLabel, LPageLabel, RPageAdd, LPageAdd }) => {

  const [user, loading] = useAuthState(auth);

  const [count, setCount] = useState(-1);

  // react-hook-form の使用
  const { register, handleSubmit, formState: { errors }, unregister } = useForm();

  const [savedData, setSavedData] = useState();

  const userDataRef = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  // Firestore からデータの読み込み
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "UserData", userDataRef.current.uid, 'Data', `${mode}Data`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSavedData(saveShot);
        }
      }
    };

    fetchData();
  }, [user]);

  // Firestore から受け取ったデータをフォームに反映
  useEffect(() => {
    if (savedData) {
      const newForms = savedData.map((_, index) =>
        createForm(index)
      );
      setForms(newForms);
      setCount(savedData.length - 1);
    }
  }, [savedData]);

  // フォームの送信処理
  const onSubmit = async (data) => {
    const formData = data.year.map((year, index) => {
      const formEntry = {
        year: year,
        month: data.month[index],
        description: data.description[index],
      };
      if (mode === 'record') {
        formEntry.detail = data.detail[index].replace(/\n/g, '\n'); // 正しい改行文字を指定
      }
      return formEntry;
    });

    userDataRef.current = { ...userDataRef.current, formData };
    await setDoc(doc(db, "UserData", userDataRef.current.uid, "Data", `${mode}Data`), {
      formData
    });
    navigate(RPageAdd);
  };

  // フォームの削除処理
  const deleteForm = (input) => {
    const newForms = forms.map((item) =>
      item.id === input.id ? { ...item, flag: true } : item
    );
    setForms(newForms);
    // フォームフィールドの登録解除
    unregister(`year[${input.index}]`);
    unregister(`month[${input.index}]`);
    unregister(`description[${input.index}]`);
    unregister(`detail[${input.index}]`);
  };

  // フォームの作成
  const createForm = (currentCount) => {
    const id = uuidv4();
    const form = {
      id: id,
      index: currentCount,
      body: (
        <div className="CareerField" key={id} style={{ position: "relative" }}>
          <Form
            year={register(`year[${currentCount}]`)}
            month={register(`month[${currentCount}]`)}
            description={register(`description[${currentCount}]`)}
            detail={register(`detail[${currentCount}]`)}
            mode={mode}
          />
          <DeleteButton onClick={() => deleteForm({ id })} />
        </div>
      ),
      flag: false,
    };
    return form;
  };

  const [forms, setForms] = useState([]);

  const display = forms.map((form) => {
    if (form.flag) {
      return null;
    }
    return (
      <div className="CareerField" key={form.id} style={{ marginBottom: "20px" }}>
        <Form
          savedData={savedData?.[form.index]}
          year={register(`year[${form.index}]`)}
          month={register(`month[${form.index}]`)}
          mode={mode}
          description={register(`description[${form.index}]`)}
          detail={register(`detail[${form.index}]`)}
          deleteForm={deleteForm}
          form={form}
          errors={errors}
        />
      </div>
    );
  });

  // フォームの追加
  const addForms = () => {
    const newCount = count + 1;
    const newForm = createForm(newCount);
    const newForms = [...forms, newForm];
    setForms(newForms);
    setCount(newCount);
  };

  return (
    <div className='Forms' style={{ marginBottom: "60px" }}>
      <div className='MainWrapper'>
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {display}
            </Row>
            <Row>
              <Col style={{ marginTop: "20px" }}>
                <AddButton onClick={addForms} />
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <RedirectButton buttonRabel={LPageLabel} type='button' onClick={() => navigate(LPageAdd)} />
              </Col>
              <Col xs={{ offset: "4", span: "4" }} style={{ textAlign: "right" }}>
                <RedirectButton buttonRabel={RPageLabel} type='submit' />
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Forms;
