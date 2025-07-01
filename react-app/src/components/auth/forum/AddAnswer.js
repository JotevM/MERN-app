import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

export default function AddAnswer({ id, toggle }) {

  const context = useContext(AuthContext)
  const [error, setError] = useState('')
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    checkToken(context)
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const answerData = {
      question: id,
      user: localStorage.getItem("id"),
      answer,
    }

    console.log(id, answer)
    fetch('http://localhost:3500/createAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(answerData),
    }).then((response) => response.json())
      .then((data) => {
        toggle();
        setAnswer("");
        setError(null)
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })

  }

  return (
    <div>
      {error && (
        <pre>
          <span className="text-center">
            <Alert color="danger">{error}</Alert>
          </span>
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Answer</Label>
          <Input
            type="textarea"
            rows="5"
            cols="20"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="mb-3"
          />
          <Button type="submit" color="success" size="sm" outline>
            Submit
          </Button>
          <Button
            className="ml-3"
            onClick={() => toggle()}
            size="sm"
            outline
            color="danger"
          >
            Cancel
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}
