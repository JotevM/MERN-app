import React, { useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  FormGroup,
  Button,
  Alert,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";

export default function AuthLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username,
      password,
    }
    fetch("http://localhost:3500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status != 201) {
          return response.json().then(data => {
            throw new Error(data.message);
          });
        } else {
          throw new Error('An error occurred during login.');
        }
      })
      .then(data => {
        console.log("DATAAAAAAAAAAA", data, data.login)
        if (data && data.loginUser) {
          const { id, token, role, name, tokenExpiration } = data.loginUser
          localStorage.setItem("id", id)
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("name", name)
          localStorage.setItem("tokenExpiration", tokenExpiration)
          context.setToken(token)
          context.setName(name)
          context.setRole(role)
          context.setTokenExpiration(tokenExpiration)
          setUsername('')
          setPassword('')
          if (role === "user") {
            navigate('/userSchedule')
          }
          else {
            navigate('/admin')
          }
        }
      })
      .catch(err => {
        console.log(err)
        setUsername("")
        setPassword("")
        setError(err.message)
      })

  };

  return (
    <div>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <Card className="bg-warning">
            <CardBody>
              <div className="text-center text-white display-3">
                <i className="fa fa-user"></i>
              </div>
              <CardTitle className="text-center display-4 mb-4 text-white">
                Clerk Login
              </CardTitle>
              {error && (
                <pre>
                  <span className="text-center">
                    <Alert color="danger">{error}</Alert>
                  </span>
                </pre>
              )}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className="mb-4 py-3">
                    <InputGroupText>
                      <i className="fa fa-user"></i>
                    </InputGroupText>
                    <Input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-4">
                  <InputGroup>
                    <InputGroupText>
                      <i className="fa fa-key"></i>
                    </InputGroupText>
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </InputGroup>
                </FormGroup>
                <Button
                  className="text-white"
                  type="submit"
                  color="warning"
                  outline
                >
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}