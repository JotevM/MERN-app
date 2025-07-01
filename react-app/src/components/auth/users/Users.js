import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import UserDetails from "./UserDetails";
import { Spinner, ListGroup, ListGroupItem, Row, Col, Alert } from "reactstrap";

export default function Users() {
  const context = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkToken(context);
    fetchUsers();
  }, []);

  //PROVERI
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3500/ordinaryUsers", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner color="success" />;
  }

  if (error) {
    return (
      <Alert color="danger">
        An error occurred while fetching users: {error}
      </Alert>
    );
  }

  return (
    <div className="container">
      <p className="mt-3 mb-4 text-center display-4">Clerk administration</p>
      <ListGroup>
        <ListGroupItem color="danger">
          <Row>
            <Col sm="4" md="4">
              Name
            </Col>
            <Col sm="4" md="4">
              Username
            </Col>
            <Col sm="2" md="2">
              Edit
            </Col>
            <Col sn="2" md="2">
              Delete
            </Col>
          </Row>
        </ListGroupItem>
        {users.map((user) => (
          <UserDetails user={user} key={user._id} />
        ))}
      </ListGroup>
    </div>
  );
}
