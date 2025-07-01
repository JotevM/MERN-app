import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth-context'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Alert,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  InputGroup,
  InputGroupText,
  Row,
  Col
} from 'reactstrap'

export default function Login(props) {
  const context = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()

  const handleSubmit = e => {
    e.preventDefault()

    const requestData = {
      email,
      password,
    }

    console.log("EMAIL AND PASS", email, password)
    fetch('http://localhost:3500/loginClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        console.log("DATAAAAAAA", data, data.loginClient)
        if (data && data.loginClient) {
          const { id, token, role, name, tokenExpiration } = data.loginClient
          localStorage.setItem("id", id)
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("name", name)
          localStorage.setItem("tokenExpiration", tokenExpiration)
          context.setToken(token)
          context.setName(name)
          context.setRole(role)
          context.setTokenExpiration(tokenExpiration)
          setEmail('')
          setPassword('')
          navigate('/clientSchedule')
        }
      })
      .catch(err => {
        console.log(err)
        setEmail("")
        setPassword("")
        setError(err.message)
      })
  }

  return (
    <div>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <Card className="bg-warning">
            <CardBody>
              <div className="text-center text-white display-3">
                <i className="fa fa-user"></i>
              </div>
              <CardTitle className="text-center display-4 mb-4 text-white">Login</CardTitle>
              <CardText>
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
                        <i className="fa fa-envelope"></i>
                      </InputGroupText>
                      <Input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <InputGroup>
                      <InputGroupText>
                        <i className="fa fa-key"></i>
                      </InputGroupText>
                      <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </InputGroup>
                  </FormGroup>

                  <Button className="text-white" type="submit" color="warning" outline>Login</Button>
                </Form>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
