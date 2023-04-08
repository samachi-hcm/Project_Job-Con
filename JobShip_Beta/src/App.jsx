import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'
import NewProfilePage from './pages/NewProfilePage'
import NewCareerPage from './pages/NewCareerPage';
import Template from './pages/Template'
import NoMatchPage from './pages/NoMatchPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="NewProfilePage" element={<NewProfilePage />} />
        <Route path='Template' element={<Template />} />
        <Route path='NewCareerPage' element={<NewCareerPage />} />
        <Route path='*' element={<NoMatchPage />} />
      </Routes>
    </div>
  );
}

export default App;