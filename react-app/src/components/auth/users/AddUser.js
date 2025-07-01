import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { useNavigate } from 'react-router-dom'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Row,
  Col,
} from "reactstrap";

export default function AddUser(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(context);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      username,
      password,
      role: "user"
    }

    fetch("http://localhost:3500/createNewUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding user");
        }
        return response.json();
      })
      .then(() => {
        setName("");
        setUsername("");
        setPassword("");
        navigate('/admin');
      })
      .catch((error) => {
        setMessages([{ message: error.message }]);
      });
  };

  const handleReset = (e) => {
    setName("");
    setUsername("");
    setPassword("");
    setMessages([]);
  };

  return (
    <div className="container">
      <p className="text-center display-4 mt-3 mb-5">Add User</p>
      {messages.length > 0 && (
        <pre>
          {messages.map(({ message }, i) => (
            <span key={i} className="text-center">
              <Alert color="danger">{message}</Alert>
            </span>
          ))}
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                className="border border-warning"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>User name</Label>
              <Input
                type="text"
                className="border border-warning"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                className="border border-warning"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" outline type="submit">
          Add user
        </Button>{" "}
        <Button color="secondary" outline onClick={handleReset}>
          Reset
        </Button>
      </Form>
    </div>
  );
}
