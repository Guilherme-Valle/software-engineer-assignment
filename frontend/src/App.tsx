import './App.css';
import ContentCard from './components/ContentCard';
import CandidatesList from './components/CandidatesList';

function App() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', padding: "10px",
      backgroundColor: 'whitesmoke', minHeight: '100vh'
    }}>
      <h3>Candidate list</h3>
      <ContentCard>
        <CandidatesList />
      </ContentCard>
    </div>
  );
}

export default App;
