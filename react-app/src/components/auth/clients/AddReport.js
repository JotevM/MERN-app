import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";

export default function AddReport({ id, forceUpdateComp, toggle }) {

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    console.log(date, description, id);
    e.preventDefault();

    const requestData = {
      date,
      description,
      client: id
    }

    fetch('http://localhost:3500/createReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error adding user");
      }
      return response.json();
    })
      .then(() => {
        setDate("");
        setDescription("");
        forceUpdateComp();
        toggle();
      })
      .catch((error) => {
        setMessages([{ message: error.message }]);
      });

  };

  const handleCancel = () => {
    setDate("");
    setDescription("");
    toggle();
    setMessages([]);
  };

  return (
    <div>
      {error && (
        <pre>
          {messages.map(({ message }, i) => (
            <span key={i} className="text-center">
              <Alert color="danger"> {message} </Alert>{" "}
            </span>
          ))}
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="2" md="2">
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                className="border border-warning rounded"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </FormGroup>
          </Col>

          <Col sm="6" md="6">
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                className="border border-warning rounded"
                rows="7"
                cols="40"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="warning" outline>
          Submit
        </Button>
        <Button color="danger" outline onClick={handleCancel}>
          Cancel{" "}
        </Button>
      </Form>
    </div>
  );
}
