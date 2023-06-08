import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Accordion, FormSelect } from 'react-bootstrap';
import { API_KEY } from '../Firebase';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';

import axios from 'axios';
import RedirectButton from './RedirectButton';
import TextareaInput from './TextareaInput';
import TextInput from './TextInput';

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-3.5-turbo';

const Chat = ({ input, checked, slot, savedData }) => {

  const { register, handleSubmit, formState: { errors }, control,setValue } = useForm();

  const [user, userLoading] = useAuthState(auth)

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ count: 400, chat: "",mode:"" })
  const [count, setCount] = useState()
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedMessage, setCheckedMessage] = useState()
  const [titleValue, setTitleValue] = useState("");

  const prevMessageRef = useRef('');
  const userDataRef = useRef({});

  useEffect(() => {
    if (Array.isArray(savedData)) {
      console.log(savedData[slot])
      setAnswer(savedData[slot].answer)
      setValue("title", savedData[slot].title);
      setValue("answer", savedData[slot].answer);
    } else {
      setValue("title", "");
      setValue("answer", "");
    }
  }, [savedData, slot, setValue])
  

  const PRPrompt = `以下の「私の経験」を参照して、「自分の強み、弱み」というテーマで文章を生成してください。なお、以下の条件に必ず従ってください。
  ${formData.chat}

  条件
  ・日本語で記述する。
  ・${formData.count}文字以内で記述する。
  ・ですます調で回答してください。
  ・レコードの内容を参照した上で、なんらかの能力が自分の強みであることを明示する。
  ・引用するレコードについて、発生した課題と、その課題を解決するために行った試作、その結果について記述してください。
  
  私の経験`
  
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
      const { photoURL, displayName, email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email };
    }
  }, [user]);

  useEffect(() => {
    const newConversation = [
      {
        role: 'assistant',
        content: answer,
      },
      {
        role: 'user',
        content: message,
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
    if(checked){
      setCheckedMessage("")
    }
    else{
      setCheckedMessage("レコードを選択してください。")
    }
  }, [checked,checkedMessage])
  

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
  }, [input, formData,selectedOption]);


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
              role: 'user',
              content: message,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      console.log(message)
      setAnswer(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      prevMessageRef.current = message;
    }
  }, [loading, message, conversation]);

  const onSave = async (data) => {
    userDataRef.current = { ...userDataRef.current };
  
    const docRef = doc(db, "UserData", userDataRef.current.email, "Data", "sheetData");
  
    try {
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        console.log(existingData)
  
        const updatedFormData = Array.from({ length: 10 }, (_, index) => existingData.formData[index] || {});
  
        updatedFormData[slot] = data;
  
        await setDoc(docRef, { formData: updatedFormData });
      }
  
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const ChatContent = React.memo(({ title,answer }) => {
    return (
      <div className="result">
        <div className="current-message">
        </div>
        <div className="current-answer">
          <h2>回答:</h2>

          <React.Fragment >
            <form onSubmit={handleSubmit(onSave)}>
              <TextInput
                action={register("title")}
                placeHolder={"タイトルを入力して下さい"}
                defaultValue={title}
              />
              <TextareaInput
                defaultValue={answer}
                action={register("answer")}
              />
              <RedirectButton
                buttonRabel={"保存する"}
                type={"submit"}
              />
            </form>
          </React.Fragment>

        </div>
      </div>
    );
  }, (prevProps, nextProps) => {
    // propsの比較を行い、変更がある場合にのみ再レンダリングする
    return prevProps.slot === nextProps.slot;
  });

  return (
    <div className="container">
      <p style={{color:"red",fontSize:"small"}}>{checkedMessage}</p>
      <FormSelect
        value={selectedOption} 
        onChange={handleOptionChange}
      >
        <option value={PRPrompt}>自己PR</option>
        <option value={GKCKPrompt}>ガクチカ</option>
      </FormSelect>
      <form className="chat-form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeHolder={"文字数を入力して下さい"}
          defaultValue={"400"}
          onChange={(e) => setFormData({ ...formData, count: e.target.value })}
        />

        <TextareaInput
          placeHolder={"その他要望があれば入力して下さい"}
          defaultValue={""}
          onChange={(e) => setFormData({ ...formData, chat: e.target.value })}
        />

        <RedirectButton disabled={!checked} buttonRabel={'生成'}>質問する</RedirectButton>
      </form>

      {loading && (
        <div className="loading">
          <p>回答中...</p>
        </div>
      )}
      {answer && !loading && (

        <ChatContent prevMessage={prevMessageRef.current} answer={answer} />

      )}


    </div>
  );
};

export default Chat;
