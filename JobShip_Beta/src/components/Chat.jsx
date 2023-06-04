import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';

import axios from 'axios';
import RedirectButton from './RedirectButton';
import TextareaInput from './TextareaInput';
import TextInput from './TextInput';

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-3.5-turbo';
const API_KEY = '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';

const Chat = ({ input }) => {

  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ count: 400, chat: "" })
  const [count, setCount] = useState()
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevMessageRef = useRef('');

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

  // ...

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

    const commonText = `以下の「レコード一覧」を参照して、「学生時代に力を入れたこと」というテーマで文章を生成してください。なお、以下の条件に必ず従ってください。
        ${formData.chat}
  
        条件
        ・日本語で記述する。
        ・${formData.count}文字以内で記述する。
        ・「優先度」のパラメータが最も高いレコードについて引用する。
        ・ですます調で回答してください。
        ・レコードの内容を参照した上で、なんらかの能力が自分に身についていることを明示する。
        ・引用するレコードについて、発生した課題と、その課題を解決するために行った試作、その結果について記述してください。
        
        レコード一覧`;

    setMessage(`${commonText}${formatInput.join('\n')}`);
  }, [input, formData]);


  const onSubmit = useCallback(async (data) => {

    console.log(data)
    setFormData(data)
    console.log(formData)

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

  const onSave = (data) => {
    console.log(data)
  }

  const ChatContent = React.memo(({ prevMessage, answer }) => {
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
  });

  return (
    <div className="container">
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

        <RedirectButton buttonRabel={'生成'}>質問する</RedirectButton>
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
