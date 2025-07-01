import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

export default function AddQuestion(props) {

  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const questionData = {
      name : name,
      question : question,
    }

    console.log( name, question)
    fetch('http://localhost:3500/createQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    }).then((result) => {
      setName("")
      setQuestion("")
      setError(null)
      window.location.reload();
      props.toggle();
    }).catch((error) => console.log(error))
  };

  return (
    <div>
      {error && (
        <pre>
            <span className="text-center">
              <Alert color="danger"> {error} </Alert>{" "}
            </span>
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormGroup>
        <FormGroup>
          <Label>Question</Label>
          <Input
            type="textarea"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </FormGroup>
        <Button type="submit" color="success" outline>
          Submit
        </Button>
      </Form>
    </div>
  );
}
