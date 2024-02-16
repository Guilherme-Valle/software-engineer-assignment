import { Button, Form } from "react-bootstrap";
import RequiredSpan from "../RequiredSpan";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DispositionForm() {
  const { id } = useParams();
  const [disposition, setDisposition] = useState('rejected');
  const [hireType, setHireType] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [fee, setFee] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      const dispositionObject = {
        disposition, hire_type: hireType,
        rejection_reason: rejectionReason, fee, currency
      }

      await axios.put(`http://localhost/api/disposition/${id}`, dispositionObject);

      navigate('/');
    } catch {
      console.error('Error on subimt');
    }
  }

  const getDisposition = async (id: string) => {
    try {
      const disposition = await axios.get(`http://localhost/api/disposition/${id}`);
      if (disposition && disposition.data) {
        console.log('disposition', disposition.data);
      }
    } catch {

    }

  }

  useEffect(() => {
    if (id !== undefined) {
      getDisposition(id);
    }
  }, [id]);

  const handleDispositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setDisposition(e.target.value);
  }

  const handleHireTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setHireType(e.target.value);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="disposition">
        <label>
          Would you like to mark this candidate as hired or rejected?
        </label>
        <br />
        <Form.Check type="radio"
          label="Hired"
          id="hired"
          value="hired" checked={disposition === 'hired'} inline
          onChange={handleDispositionChange} />
        <Form.Check type="radio"
          label="Rejected"
          id="hired"
          value="rejected"
          checked={disposition === 'rejected'} inline
          onChange={handleDispositionChange} required />
      </Form.Group>
      {disposition === 'hired' && <Form.Group className="mb-3" controlId="hireType">
        <label>
          Is the candidate being hired internally or externally?
        </label>
        <br />
        <Form.Check type="radio"
          label="Internal"
          id="internal"
          value="internal" checked={hireType === 'internal'} inline
          onChange={handleHireTypeChange} />
        <Form.Check type="radio"
          label="External"
          id="external"
          value="external"
          checked={hireType === 'external'} inline
          onChange={handleHireTypeChange} required />
      </Form.Group>}

      <Button variant="secondary" type="submit">
        Save disposition
      </Button>
    </Form>
  )
}
