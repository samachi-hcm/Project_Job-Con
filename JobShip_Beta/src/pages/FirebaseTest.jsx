import React from 'react'
import { auth, googleProvider,facebookProvider,twitterProvider,db } from '../Firebase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import Button from '../components/Button';


const FirebaseTest = () => {
  const signInwithGoogle = () => {
    signInWithPopup(auth, googleProvider)
  }

  const signInwithFacebook = () =>{
    signInWithPopup(auth,facebookProvider)
  }

  const signInwithTwitter = () => {
    signInWithPopup(auth,twitterProvider)
  }

  const [user] = useAuthState(auth)

  const google = (
      <button onClick={signInwithGoogle}>Google</button>
  )

  const facebook = (
      <button onClick={signInwithFacebook}>Facebook</button>
  )

  const twitter = (
      <button onClick={signInwithTwitter}>Twitter</button>
  )

  const [contents, setContents] = useState([])

  useEffect(() => {
    const  testData = collection(db,"test")
    console.log(testData)
    getDocs(testData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => doc.data()))
    })
  },[])

  return (
    <div className='FirebaseTest'>

      {
        user ? (
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='ContentsTitle'>
            <p>{contentsDescription1}<br />{contentsDescription2}</p>
          </div>
          <Button buttonRabel={buttonRabel} />
        </form>
        )
        : (
           <>
            {google}
            {facebook}
            {twitter}
          </>
        )
      }
    </div>
  )
}

export default FirebaseTest