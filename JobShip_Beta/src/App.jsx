import { Routes, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage' 
import SigninPage from './pages/SigninPage'
import NewProfilePage from './pages/NewProfilePage'
import NewCareerPage from './pages/NewCareerPage';
import NewPortfolioPage from './pages/NewPortfolioPage'
import FirebaseTest from './pages/FirebaseTest';
import RePage from './pages/RePage';
import Template from './pages/Template'
import NoMatchPage from './pages/NoMatchPage'

function App() {
  const {
    register, 
    handleSubmit, 
    formState:{errors}
  } = useForm();
  
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path='SigninPage' element={<SigninPage />} />
        <Route path="NewProfilePage" element={<NewProfilePage />} />
        <Route path='Template' element={<Template />} />
        <Route path='NewCareerPage' element={<NewCareerPage />} />
        <Route path='NewPortfolioPage' element={<NewPortfolioPage />} />
        <Route path='RePage' element={<RePage />} />
        <Route path='FirebaseTest' element={<FirebaseTest />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </div>
  );
}

export default App;