import firebase from "firebase/compat/app"
import React, { useState, useEffect, useRef } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth,signInWithPopup,signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA3JTiS5EnFusUxnSSEUu-37lbMjNgd4g4",
  authDomain: "jobrecord-8c52b.firebaseapp.com",
  projectId: "jobrecord-8c52b",
  storageBucket: "jobrecord-8c52b.appspot.com",
  messagingSenderId: "132522316388",
  appId: "1:132522316388:web:b9bba8bdd4a53c949a8571",
  measurementId: "G-ZF2MZDSKFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const signInwithGoogle = () => {
  signInWithPopup(auth, googleProvider)
}

const googleButton = (
  <button onClick={signInwithGoogle}>Google</button>
)


//firestore
const db = getFirestore(app)

const getUserData = (input) => {
  const [user, loading] = useAuthState(auth);
  const userDataRef = useRef({});
  const [Data, setData] = useState();

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email };
      if (input == null) {
        setData(userDataRef.current)
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && input != null) {
      const fetchData = async () => {
        const docRef = doc(db,"UserData", userDataRef.current.email, 'Data',`${input}Data`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setData(saveShot);
        }
      };
      fetchData();
    }
  }, [user, input]);

  return Data;
}



export { 
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  db,
  signOut,
  googleButton,
  getUserData
}