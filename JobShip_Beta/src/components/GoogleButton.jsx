// Reactと必要なFirebaseモジュールをインポート
import React, { useRef, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // UUID生成のために追加

// CSSスタイルをインポート
import './css/GoogleButton.css';

// Googleログインボタンコンポーネントの定義
const GoogleButton = () => {
  // Firebase認証の状態とユーザー情報を取得
  const [user, loading] = useAuthState(auth);

  // ユーザーが存在するかどうかの状態を管理
  const [isUser, setIsUser] = useState(false);

  // Google認証プロバイダーの作成
  const googleProvider = new GoogleAuthProvider();

  // ユーザーデータの参照を作成
  const userDataRef = useRef({});

  // ページ遷移を可能にする関数を取得
  const navigate = useNavigate();

  // ユーザー情報の変更を監視してuserDataRefを更新
  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email };
    }
  }, [user]);

  // ユーザーが存在するかどうかを確認し、状態を更新
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'UserData', userDataRef.current.email, 'Data', 'profileData');
        const docSnap = await getDoc(docRef);
        const saveShot = docSnap.data();
        if (saveShot) {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      }
    };

    fetchData();
  }, [user]);

  // Googleアカウントを使用してログインする関数
  const signInwithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if (isUser) {
      navigate('/');
    } else {
      navigate('/NewProfilePage');
    }
  };

  // Googleログインボタンの表示
  return (
    <div className="GoogleButton">
      <button onClick={signInwithGoogle}>
        <div className="icon">
          <img src="/Google-icon.png" alt="Google icon" />
        </div>
        <div className="text">
          <div>Google</div>
        </div>
      </button>
    </div>
  );
};

export default GoogleButton;
