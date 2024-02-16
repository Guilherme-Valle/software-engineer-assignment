import './App.css';
import ContentCard from './components/ContentCard';
import CandidatesList from './components/CandidatesList';
import CandidatesHeader from './components/PageHeader';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Candidate from './pages/Candidate';
import Disposition from './pages/Disposition';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/candidate/:id?' element={<Candidate />} />
      <Route path='/disposition/:id' element={<Disposition />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
