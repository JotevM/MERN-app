import AccountDetails from "./AccountDetails";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { Spinner, ListGroup, ListGroupItem, Row, Col, Alert } from "reactstrap";

export default function Account() {
  const context = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkToken(context);
  }, []);

  const fetchAccounts = (clientId = localStorage.getItem("id")) => {
    fetch(`http://localhost:3500/findBankAccounts?id=${clientId}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching accounts");
        }
        return response.json();
      })
      .then((data) => {
        console.log(clientId);
        setAccounts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) {
    return <Spinner color="success" />;
  }

  if (error) {
    return (
      <Alert color="danger">
        An error occurred while fetching account: {error}
      </Alert>
    );
  }

  return (
    <div className="container">
      <p className="mt-3 mb-4 text-center display-4">Accounts</p>
      <ListGroup>
        <ListGroupItem color="dark">
          <Row>
            <Col sm="4" md="4">
              <strong>
              Account type
              </strong>
            </Col>
            <Col sm="4" md="4">
              <strong>
              Account number
              </strong>
            </Col>
          </Row>
        </ListGroupItem>
        {accounts.map((account) => (
          <AccountDetails account={account} key={account._id} />
        ))}
      </ListGroup>
    </div>
  );
}
