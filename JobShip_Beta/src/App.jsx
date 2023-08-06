import React from 'react';
import { useRef,useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage' 
import NewProfilePage from './pages/NewProfilePage'
import NewCareerPage from './pages/NewCareerPage';
import NewPortfolioPage from './pages/NewPortfolioPage'
import FirebaseTest from './pages/FirebaseTest';
import ReProfile from './pages/ReProfile';
import ReCareerPage from './pages/ReCareerPage';
import RePortfolioPage from './pages/RePortfolioPage'
import Chat from './components/Chat';
import EditSheet from './pages/EditSheet';
import NoMatchPage from './pages/NoMatchPage'
import Project from './pages/Project';
import Projects from './pages/Projects';
import Console from './pages/Console';
import ApplyPage from './pages/ApplyPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CheckApplicants from './pages/CheckApplicants';
import "./App.css"


function App() {
  const {
    register, 
    handleSubmit, 
    formState:{errors}
  } = useForm();
  
  return (
    <div className='App' style={{fontFamily:"Noto Sans JP" , fontWeight:"500"}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="NewProfilePage" element={<NewProfilePage />} />
        <Route path='NewCareerPage' element={<NewCareerPage />} />
        <Route path='NewPortfolioPage' element={<NewPortfolioPage />} />
        <Route path='ReProfile' element={<ReProfile />} />
        <Route path='ReCareer' element={<ReCareerPage />} />
        <Route path='Chat' element={<Chat />} />
        <Route path='EditSheet' element={<EditSheet />} />
        <Route path='ReRecord' element={<RePortfolioPage />} />
        <Route path='FirebaseTest' element={<FirebaseTest />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="Projects" element={<Projects />} />
        <Route path="Console" element={<Console />} />
        <Route path="CheckApplicants" element={<CheckApplicants />} />
        <Route path="ApplyPage/:id" element={<ApplyPage />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="TermsOfService" element={<TermsOfService />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </div>
  );
}

export default App;