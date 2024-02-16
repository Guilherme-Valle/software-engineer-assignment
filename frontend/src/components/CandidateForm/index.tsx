import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import RequiredSpan from "../RequiredSpan";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CandidateForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  let candidateAction = 'Create';
  if (id) {
    candidateAction = 'Update';
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
 
      if (id) {
        await axios.put(`http://localhost/api/candidate/${id}`, {
          name, email, phone
        });
      } else {
        await axios.post('http://localhost/api/candidate/', {
          name, email, phone
        });  
      }

      navigate('/');
    } catch {
      console.error('Error on subimt');
    }
  }

  const getCandidate = async (id: string) => {
    try {
      const candidate = await axios.get(`http://localhost/api/candidate/${id}`);
      if (candidate && candidate.data) {
        setName(candidate.data.name);
        setEmail(candidate.data.email);
        setPhone(candidate.data.phone);
      }
    } catch {

    }

  }

  useEffect(() => {
    if (id !== undefined) {
      getCandidate(id);
    }
  }, [id])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="nameCandidate">
        <Form.Label>Name <RequiredSpan /></Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)}
          type="text" placeholder="Full name" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailCandidate">
        <Form.Label>Email <RequiredSpan /></Form.Label>
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="name@email.com" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phoneCandidate">
        <Form.Label>Phone</Form.Label>
        <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)}
          type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" />
      </Form.Group>
      <Button variant="secondary" type="submit">
        {candidateAction} candidate
      </Button>
    </Form>
  )
}
