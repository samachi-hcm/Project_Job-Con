import React from 'react';
import { useRef,useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage' 
import SigninPage from './pages/SigninPage'
import NewProfilePage from './pages/NewProfilePage'
import NewCareerPage from './pages/NewCareerPage';
import NewPortfolioPage from './pages/NewPortfolioPage'
import FirebaseTest from './pages/FirebaseTest';
import RePage from './pages/RePage';
import ReProfile from './pages/ReProfile';
import ReCareerPage from './pages/ReCareerPage';
import RePortfolioPage from './pages/RePortfolioPage'
import Chat from './components/Chat';
import EditSheet from './pages/EditSheet';
import Template from './pages/Template'
import NoMatchPage from './pages/NoMatchPage'
import Header1 from './components/Header1';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Console from './pages/Console';
import MailToId from './pages/MailToId';
import ApplyPage from './pages/ApplyPage';

function App() {
  const {
    register, 
    handleSubmit, 
    formState:{errors}
  } = useForm();
  
  return (
    <div className='App' style={{fontFamily:"Yu Gothic,Noto Sans" , fontWeight:"600"}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="Header1" element={<Header1 />} />
        <Route path='SigninPage' element={<SigninPage />} />
        <Route path="NewProfilePage" element={<NewProfilePage />} />
        <Route path='Template' element={<Template />} />
        <Route path='NewCareerPage' element={<NewCareerPage />} />
        <Route path='NewPortfolioPage' element={<NewPortfolioPage />} />
        <Route path='RePage' element={<RePage />} />
        <Route path='ReProfile' element={<ReProfile />} />
        <Route path='ReCareer' element={<ReCareerPage />} />
        <Route path='Chat' element={<Chat />} />
        <Route path='EditSheet' element={<EditSheet />} />
        <Route path='ReRecord' element={<RePortfolioPage />} />
        <Route path='FirebaseTest' element={<FirebaseTest />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="Projects" element={<Projects />} />
        <Route path="Console" element={<Console />} />
        <Route path="MailToId" element={<MailToId />} />
        <Route path="ApplyPage" element={<ApplyPage />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </div>
  );
}

export default App;