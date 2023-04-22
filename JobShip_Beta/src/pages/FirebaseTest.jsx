import React from 'react'
import { auth, googleProvider,facebookProvider,twitterProvider } from '../Fireabase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

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
    <>
      <button onClick={signInwithGoogle}>Google</button>
    </>
  )

  const facebook = (
    <>
      <button onClick={signInwithFacebook}>Facebook</button>
    </>
  )

  const twitter = (
    <>
      <button onClick={signInwithTwitter}>Twitter</button>
    </>
  )

  return (
    <div className='FirebaseTest'>

      {
        user ? (
          <p>logged in</p>
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