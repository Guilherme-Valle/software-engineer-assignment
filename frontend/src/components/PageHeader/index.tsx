import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ text, withCreateCandidate = false }: {
  text: string,
  withCreateCandidate?: boolean
}) {

  const navigate = useNavigate();

  const goToCreateCandidate = () => {
    navigate('/candidate');
  }
  return (
    <div style={{
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px'
    }}>
      <h3>{text}</h3>
      {withCreateCandidate &&
        <Button variant="secondary" size="sm"
          onClick={() => goToCreateCandidate()}>
          Create candidate
        </Button>}
    </div>
  )
}
