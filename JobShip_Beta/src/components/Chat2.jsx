import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Accordion, FormSelect } from 'react-bootstrap';
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
import { API_KEY } from '../../../GPT_API';
 
const Chat2 = ({ input, checked, slot, savedData }) => {
 const { register, handleSubmit, formState: { errors }, control,setValue } = useForm();

  const [user, userLoading] = useAuthState(auth)

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ count: 400, chat: "",mode:"" })
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedMessage, setCheckedMessage] = useState()
  const prevMessageRef = useRef('');
  const userDataRef = useRef({});

 
  

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
 
  // フォーム送信時の処理
  const onSubmit = useCallback( async ( event ) => {
    event.preventDefault();
 
    // フォームが空のとき
    if ( !message ) {
      alert( 'メッセージがありません。' );
      return;
    }
 
    // APIリクエスト中はスルー
    if ( loading ) return;
 
    // APIリクエストを開始する前にローディング表示を開始
    setLoading( true );
 
    try {
      // API リクエスト
      const response = await axios.post( `${ API_URL }chat/completions`, {
        model: MODEL,
        messages: [
          ...conversation,
          {
            'role': 'user',
            'content': message,
          },
        ],
      }, {
        // HTTPヘッダー(認証)
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ API_KEY }`
        }
      });
 
      // 回答の取得
      setAnswer( response.data.choices[0].message.content.trim() );
 
    } catch ( error ) {
      // エラーハンドリング
      console.error( error );
 
    } finally {
      // 後始末
      setLoading( false );  // ローディング終了
      prevMessageRef.current = message; // 今回のメッセージを保持
    }
  }, [ loading, message, conversation ] );
 
  // チャット内容
  const ChatContent = React.memo( ( { prevMessage, answer } ) => {
    return (
      <div className='result'>
        <div className='current-message'>
          <h2>質問:</h2>
          <p>{ prevMessage }</p>
        </div>
        <div className='current-answer'>
          <h2>回答:</h2>
          <p>{ answer.split( /\n/ )
                .map( ( item, index ) => {
                  return (
                    <React.Fragment key={ index }>
                      { item }
                      <br />
                    </React.Fragment>
                  );
                } )
              }
          </p>
        </div>
      </div>
    )
  } );
 
  // フォームの表示
  return (
    <div className='container'>
      <form className='chat-form' onSubmit={ onSubmit }>
        <label>
          <textarea
            className='message'
            rows='5'
            cols='50'
            value={ message }
            onChange={ e => {
              setMessage( e.target.value ) ;
            } }
          />
        </label>
        <div className='submit'>
          <button type="submit">質問する</button>
        </div>
      </form>
      { loading && (
        <div className='loading'>
          <p>回答中...</p>
        </div>
      ) }
      { answer && !loading && (
        <ChatContent
          prevMessage={ prevMessageRef.current }
          answer={ answer }
        />
      ) }
    </div>
  );
}
 
export default Chat2;