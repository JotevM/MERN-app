import React from "react";
import UserDetails from "./UserDetails";
import { useState, useEffect } from "react";

import { Spinner, ListGroupItem, ListGroup, Row, Col, Alert } from "reactstrap";


export default function ClientMessages() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, [])

  //PROVERI
  const fetchMessages = () => {
    fetch('http://localhost:3500/ordinaryUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        console.log(responseData)
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (error) {
    return (
      <span className="text-center">
        <Alert color="danger">{error}</Alert>
      </span>
    );
  }

  if (loading) {
    return <Spinner color="success" />;
  }


  return (
    <div>
      {/* <h1>Client messages</h1> */}
      <ListGroup flush style={{ marginRight: "100px" }}>
        <Row>
          <Col sm="2" md="2" xs="6">
            <ListGroupItem>Clerks: </ListGroupItem>
            {data.map((user) => {
              return <UserDetails user={user} key={user._id} />;
            })}
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}