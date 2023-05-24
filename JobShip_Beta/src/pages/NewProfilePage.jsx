import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { useForm } from 'react-hook-form'
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';


//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import ProfileInput from '../components/ProfileInput'
import RedirectButton from '../components/RedirectButton';
//linked page

//styles
import './css/NewProfilePage.css'

const NewProfilePage = () => {

  const [user, loading] = useAuthState(auth)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [savedData, setSavedData] = useState()

  const userDataRef = useRef({});

  useEffect(() => {
    if (user) {
      const { photoURL, displayName,email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName,email };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db,"UserData", userDataRef.current.email, 'Data',`profileData`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSavedData(saveShot)
        }
      }
    };

    fetchData();
  }, [user]);

  const onSubmit = async (formData) => {
    console.log(formData)
    userDataRef.current = { ...userDataRef.current, formData }
    await setDoc(doc(db, "UserData",userDataRef.current.email, "Data",`profileData`), {
      formData,
    });
  };


  return (
    <div className='NewProfilePage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileInput 
            familyName={register(`familyName`)}
            firstName={register(`firstName`)}
            familyNameE={register(`familyNameE`)}
            firstNameE={register(`firstNameE`)}
          />
          <RedirectButton buttonRabel="次へ" />
        </form>
      </div>
      

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewProfilePage