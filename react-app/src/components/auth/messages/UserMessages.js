import React, { useEffect } from "react";

import ClientDetails from "./ClientDetails";

import { Spinner, ListGroupItem, ListGroup, Row, Col } from "reactstrap";

import { useState } from "react";

export default function UserMessages() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {

    fetch('http://localhost:3500/clients')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }

  console.log(data)

  if (loading) return <Spinner color="success" />;
  console.log("DATA", data);


  return (
    <div>
      <ListGroup flush>
        <Row>
          <Col sm="2" md="2" xs="6">
            <ListGroupItem>Clients: </ListGroupItem>
            {data.map((client) => {
              return <ClientDetails client={client} key={client._id} />;
            })}
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}
