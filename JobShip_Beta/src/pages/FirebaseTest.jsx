import React from 'react'
import { auth, googleProvider,facebookProvider,twitterProvider,db,signOut,googleButton } from '../Firebase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import Button from '../components/RedirectButton';

const FirebaseTest = () => {

  const handleSignOut = () => {
    signOut(auth);
  }

  const signInwithFacebook = () =>{
    signInWithPopup(auth,facebookProvider)
  }

  const signInwithTwitter = () => {
    signInWithPopup(auth,twitterProvider)
  }

  const [user] = useAuthState(auth)


  const facebook = (
      <button onClick={signInwithFacebook}>Facebook</button>
  )

  const twitter = (
      <button onClick={signInwithTwitter}>Twitter</button>
  )

  const signOutButton = (
    <button onClick={handleSignOut}>Sign Out</button>
  )



  return (
    <div className='FirebaseTest'>

      {
        user ? (
          <>
            <p>こにちは</p>
            {signOutButton}
          </>   
        )
        : (
           <>
            {googleButton}           
          </>
        )
      }
    </div>
  )
}

export default FirebaseTest