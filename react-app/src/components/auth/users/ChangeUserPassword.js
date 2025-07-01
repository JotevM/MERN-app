import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { Link } from "react-router-dom";
import context from "../../../context/auth-context";
import { useNavigate } from 'react-router-dom'
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

export default function ChangeUserPassword(props) {
  let context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      id: localStorage.getItem("id"),
      password,
      newPassword,
      confirmation,
    }
    console.log(localStorage.getItem("role"));
    if (context.role === "client") {
      changeClientPassword(requestData)
        .then((result) => {
          console.log("RESULT", result);
          setPassword("");
          setNewPassword("");
          setConfirmation("");
          setMessages([]);
          navigate('/')
        })
        .catch((error) => {
          setMessages([error.message]);
        });
    } else {
      changePassword(requestData)
        .then((result) => {
          console.log("RESULT", result);
          setPassword("");
          setNewPassword("");
          setConfirmation("");
          setMessages([]);
          navigate("/")
        })
        .catch((error) => {
          setMessages([error.message]);
        });
    }
  };

  const changePassword = async (req) => {
    try {
      console.log("fetch");
      const response = await fetch("http://localhost:3500/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        throw new Error("Failed to change password");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const changeClientPassword = async (req) => {
    try {
      const response = await fetch("http://localhost:3500/changeClientPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="container">
      <p className="text-center display-4 mt-3 mb-4">Change password</p>
      {data && <Alert color="success">Password successfully changed</Alert>}
      {messages.length > 0 &&
        messages.map((message, i) => (
          <Alert color="danger" key={i}>
            {message}
          </Alert>
        ))}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Password</Label>
              <Input
                className="border border-warning"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>New Password</Label>
              <Input
                className="border border-warning"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input
                className="border border-warning"
                type="password"
                onChange={(e) => setConfirmation(e.target.value)}
                value={confirmation}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="warning" outline>
          Change
        </Button>
        <Button tag={Link} to="/admin" color="secondary" outline>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

