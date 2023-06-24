import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';
import { useViewport } from 'react-viewport-hooks';

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';

//linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'
import ReCareerPage from './ReCareerPage';

const MailToId = () => {

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "ProjectData", "Test",);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const saveShot = docSnap;
        console.log(saveShot)
      }
    };
    fetchData();
  }, []);

  return (
    <div>MailToId</div>
  )
}

export default MailToId