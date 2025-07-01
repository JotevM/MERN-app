import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
} from "reactstrap";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import ClientDetails from "./ClientDetails"

export default function Clients() {
  const [name, setName] = useState("");
  const [clients, setClients] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
    //console.log("ADD USER")
  }, []);

  const handleRefetch = async () => {
    console.log("CALLED REFETCH");
    await fetchClients(name);
  };

  const handleFind = async (e) => {
    e.preventDefault()

    await fetchClients(name);
    setName("");
  };

  const fetchClients = async (name) => {
    try {
      const response = await fetch(`http://localhost:3500/findClients?name=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {error && (
        <pre>
          <span className="text-center">
            <Alert color="danger"> {error} </Alert>{" "}
          </span>
        </pre>
      )}
      <Label>Name</Label>

      <Form inline>
        <FormGroup>
          <Input
            type="text"
            className="border border-warning rounded"
            name={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        {/* <Button type="submit" className="mx-3" onClick={ ()=>findclients({ variables:{name}}) } color="warning" outline>Find</Button>     */}
        <Button
          type="submit"
          className="mx-3"
          onClick={handleFind}
          color="warning"
          outline
        >
          Find
        </Button>
      </Form>
      {clients.length === 0 ? null : (
        <ListGroup className="mt-3">
          <ListGroupItem color="danger">
            <Row>
              <Col sm="3" md="3">
                Name
              </Col>
              <Col sm="3" md="3">
                City
              </Col>
              <Col sm="3" md="3">
                Address
              </Col>
              <Col sm="2" md="2">
                Records
              </Col>
            </Row>
          </ListGroupItem>
          {clients.length > 0 &&
            clients.map((client) => {
              return (
                <ClientDetails
                  client={client}
                  handleRefetch={handleRefetch}
                  key={client.id}
                />
              );
            })}
        </ListGroup>
      )}
    </div>
  );
}
