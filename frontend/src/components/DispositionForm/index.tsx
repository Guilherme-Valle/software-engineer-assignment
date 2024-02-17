import { Button, Form } from "react-bootstrap";
import RequiredSpan from "../RequiredSpan";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { rejectionReasons } from "../../utils/rejection_reasons";
import { currencies } from "../../utils/currencies";

export default function DispositionForm() {
  const { id } = useParams();
  const [disposition, setDisposition] = useState('rejected');
  const [hireType, setHireType] = useState<string>('internal');
  const [rejectionReason, setRejectionReason] = useState<string>('Other');
  const [fee, setFee] = useState<string>('0');
  const [currency, setCurrency] = useState<string>('USD');
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

      {disposition === 'rejected' &&
        <Form.Group className="mb-3" controlId="rejectReason">
          <label>What is the reason for rejection?</label>
          <Form.Select value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}>
            {rejectionReasons
              .map(reason => <option value={reason}>{reason}</option>)}
          </Form.Select>
        </Form.Group>
      }

      {disposition === 'hired' && hireType === 'external' &&
        <Form.Group className="mb-3 flex flex-col" controlId="fee">
          <label>Placement fee earned (optional)</label>
          <div className="flex flex-row">
            <Form.Control value={fee} type="number" className="!w-5/6"
              placeholder="$0.00" step=".01"
              onChange={(e) => setFee(e.target.value)} />
            <Form.Select value={currency} className="!w-1/6"
              onChange={(e) => setCurrency(e.target.value)}>
              {currencies
                .map(currencyOpt => <option value={currencyOpt}>{currencyOpt}</option>)}
            </Form.Select>
          </div>
        </Form.Group>
      }


      <Button variant="secondary" type="submit">
        Save disposition
      </Button>
    </Form>
  )
}
