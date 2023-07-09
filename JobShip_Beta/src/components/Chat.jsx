import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Accordion, FormSelect, Button } from 'react-bootstrap';

import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';

import axios from 'axios';
import RedirectButton from './RedirectButton';
import TextareaInput from './TextareaInput';
import TextInput from './TextInput';
import CopyTOClipBoard from './CopyTOClipBoard';

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-3.5-turbo';

const Chat = ({ input, checked, slot, savedData, setSaveFlag, saveFlag }) => {

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  const [user, userLoading] = useAuthState(auth)

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ count: 400, chat: "", mode: "" })
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedMessage, setCheckedMessage] = useState()
  const prevMessageRef = useRef('');
  const userDataRef = useRef({});
  const [title, setTitle] = useState('')
  const [savedTitle, setSavedTitle] = useState("")
  const [savedAnswer, setSavedAnswer] = useState("")
  const [API_KEY, setAPI_KEY] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "API", "GPT");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const saveShot = docSnap.data().Key;
        setAPI_KEY(saveShot)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(savedData)) {
      setSavedTitle(savedData[slot].title)
      setSavedAnswer(savedData[slot].answer)
    } else {

    }
  }, [savedData, slot])


  const PRPrompt = `以下の「レコード一覧」を参照して、「自己PR」というテーマで文章を生成してください。なお、以下の条件に必ず従ってください。
  ${formData.chat}
  条件
  ・日本語で記述する。
  ・${formData.count}文字以内で記述する。
  ・ですます調で回答してください。
  ・レコードの内容を参照した上で、最も特徴的である経験を明示してください。

  レコード一覧`


  const GKCKPrompt = `以下の「私の経験」を参照して、「学生時代に力を入れたこと」というテーマで文章を生成してください。なお、以下の条件に必ず従ってください。
  ${formData.chat}

  条件
  ・日本語で記述する。
  ・${formData.count}文字以内で記述する。
  ・ですます調で回答してください。
  ・レコードの内容を参照した上で、なんらかの能力が自分に身についていることを明示する。
  ・引用するレコードについて、発生した課題と、その課題を解決するために行った試作、その結果について記述してください。
  
  私の経験`

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  useEffect(() => {
    const newConversation = [
      {
        'role': 'assistant',
        'content': answer,
      },
      {
        'role': 'user',
        'content': message,
      },
    ];
    setConversation([...conversation, ...newConversation]);
    setMessage('');
  }, [answer]);

  const [selectedOption, setSelectedOption] = useState(PRPrompt);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  useEffect(() => {
    if (checked) {
      setCheckedMessage("")
    }
    else {
      setCheckedMessage("レコードを選択してください。")
    }
  }, [checked, checkedMessage])


  useEffect(() => {
    if (!input) return;

    let formatInput = [];

    if (Array.isArray(input)) {
      formatInput = input.map((item) => {
        return ` ${item.year}年${item.month}月: ${item.description} - ${item.detail}`;
      });
    } else {
      formatInput = [
        ` ${input.year}年${input.month}月: ${input.description} - ${input.detail}`,
      ];
    }

    const commonText = selectedOption

    setMessage(`${commonText}${formatInput.join('\n')}`);
  }, [input, formData, selectedOption]);


  const onSubmit = useCallback(async (data) => {
    setFormData(data)
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}chat/completions`,
        {
          model: MODEL,
          messages: [
            ...conversation,
            {
              'role': 'user',
              'content': message,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        }
      );

      setAnswer(response.data.choices[0].message.content.trim());
      console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      prevMessageRef.current = message;
    }
  }, [loading, message, conversation]);

  const onSave = async (data, event) => {

    console.log(data)

    event.preventDefault(); // フォームのデフォルトの送信動作をキャンセルする

    const { name } = event.nativeEvent.submitter; // クリックされたボタンのname属性を取得

    if (name == "save") {
      userDataRef.current = { ...userDataRef.current };

      const docRef = doc(db, "UserData", userDataRef.current.uid, "Data", "sheetData");

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const existingData = docSnap.data();

          const updatedFormData = Array.from({ length: 10 }, (_, index) => existingData.formData[index] || {});

          updatedFormData[slot] = data;

          await setDoc(docRef, { formData: updatedFormData });
        }

        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data: ", error);
      }
      setSaveFlag(saveFlag + 1)
    }
    else{
      copyToClipboard(data.answer)
    }


  };

  const copyToClipboard = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      console.log('コピーが成功しました');
    } catch (error) {
      console.error('クリップボードへのコピー中にエラーが発生しました:', error);
    }
  };


  const ChatContent = React.memo(({ title, answer }) => {
    return (
      <React.Fragment >
        <Container>
          <form onSubmit={handleSubmit(onSave)}>
            <Row>
              <TextInput
                action={register("title")}
                placeHolder={"タイトルを入力して下さい"}
                defaultValue={title}
              />
              <TextareaInput
                defaultValue={answer}
                action={register("answer")}
              />
              <Col xs="auto">
                <RedirectButton
                  buttonRabel={"保存する"}
                  type={"submit"}
                  name={"save"}
                />
              </Col>
              <Col xs="auto">
                <CopyTOClipBoard />
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }, (prevProps, nextProps) => {
    // propsの比較を行い、変更がある場合にのみ再レンダリングする
    return prevProps.slot === nextProps.slot;
  });

  const SavedContent = React.memo(({ savedTitle, savedAnswer }) => {
    return (
      <React.Fragment >
        <Container>
          <form onSubmit={handleSubmit(onSave)}>
            <Row>
              <TextInput
                action={register("title")}
                placeHolder={"タイトルを入力して下さい"}
                defaultValue={savedTitle}
              />
              <TextareaInput
                defaultValue={savedAnswer}
                action={register("answer")}
              />
              <Col xs="auto">
                <RedirectButton
                  buttonRabel={"保存する"}
                  type={"submit"}
                  name={"save"}
                />
              </Col>
              <Col xs="auto">
                <CopyTOClipBoard />
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }, (prevProps, nextProps) => {
    // propsの比較を行い、変更がある場合にのみ再レンダリングする
    return prevProps.slot === nextProps.slot;
  });

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <Row >
        <p style={{ color: "red", fontSize: "small" }}>{checkedMessage}</p>
        <div style={{ height: "20px" }}></div>
        <p style={{ fontSize: "large" }}>2.生成する内容を指定する</p>
        <form className="chat-form" onSubmit={handleSubmit(onSubmit)}>
          <Row style={{ marginBottom: "5px" }}>
            <Col xs="6">
              <FormSelect
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ paddingBottom: "2px", height: "100%", fontWeight: "600" }}
              >
                <option value={PRPrompt}>自己PR</option>
                <option value={GKCKPrompt}>ガクチカ</option>
              </FormSelect>
            </Col>
            <Col xs="6">
              <TextInput
                placeHolder={"文字数を入力して下さい"}
                defaultValue={"400"}
                onChange={(e) => setFormData({ ...formData, count: e.target.value })}
              />
            </Col>
          </Row>

          <TextareaInput
            placeHolder={"その他要望があれば入力して下さい"}
            defaultValue={""}
            onChange={(e) => setFormData({ ...formData, chat: e.target.value })}
          />

          <RedirectButton disabled={!checked} buttonRabel={'生成'}>質問する</RedirectButton>
        </form>

        <div style={{ height: "20px" }}></div>
        <p style={{ fontSize: "large" }}>3.データを編集して保存する</p>
        {loading && (
          <div className="loading">
            <p>回答中...</p>
          </div>
        )}
        {answer && !loading && (
          <ChatContent answer={answer} />
        )}

        <Accordion style={{ marginTop: "30px" }} defaultActiveKey={null}>
          <Accordion.Item >
            <Accordion.Header >
              <p style={{ fontWeight: "600", margin: "0" }}>アップロード中のデータ</p>
            </Accordion.Header >
            <Accordion.Body>
              <SavedContent savedAnswer={savedAnswer} savedTitle={savedTitle} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </Row>
    </Container>
  );
};

export default Chat;
