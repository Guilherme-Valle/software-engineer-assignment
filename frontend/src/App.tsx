import './App.css';
import ContentCard from './components/ContentCard';
import CandidatesList from './components/CandidatesList';
import CandidatesHeader from './components/PageHeader';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Candidate from './pages/Candidate';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-candidate' element={<Candidate />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
