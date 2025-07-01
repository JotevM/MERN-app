import React, { useContext, useEffect, useState } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import ChangeClientModal from "./ChangeClientModal";
import DeleteClientModal from "./DeleteClientModal";
import { Navigate } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner,
} from "reactstrap";

export default function Basic(clientD) {

  const context = useContext(AuthContext);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { _id, name, city, address, phone, UPIN, IDCard, bankAccounts, email } = clientD.clientD;

  console.log(_id);
  useEffect(() => {
    checkToken(context);
  }, []);

  console.log("ID CAAAAAAAAAARD", IDCard)

  const fetchClient = (clientId = _id) => {
    fetch(`http://localhost:3500/findClient?id=${clientId}`, {
    })
      .then((response) => {
        if (!clientId) {
          setError(new Error("Missing client ID"));
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error("Error fetching schedules");
        }
        return response.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchClient(_id);
  }, [_id]);

  if (context.token === "") {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Spinner color="success" />;
  }

  //const { id, name, city, address, phone, UPIN, IDCard, bankAccounts, email } = client;
  return (
    <div>
      <Card body outline color="warning" className="mt-5 p-4">
        <CardTitle>
          <strong>
          <span className="font-weight-bold mr-2">Name:</span>
          </strong>
          {name}
        </CardTitle>
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">City:</span>
          </strong>
          {city}
        </CardText>
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">Address:</span>
          </strong>
          {address}
        </CardText>
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">Phone:</span>
          </strong>
          {phone}
        </CardText>
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">UPIN:</span>
          </strong>
          {UPIN}
        </CardText>
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">ID Card:</span>
          </strong>
          {IDCard}
        </CardText>
        {/*<CardText>
          <strong>
          <span className="font-weight-bold mr-2">Bank Accounts:</span>
          </strong>
          {bankAccounts.map((account) => (
            <div key={account._id}>
              <p>Account Number:{account.accountNumber}</p>
              <p>Account Type: {account.accountType}</p>
            </div>
          ))}
          </CardText>*/}
        <CardText>
          <strong>
          <span className="font-weight-bold mr-2">E mail:</span>
          </strong>
          {email}
        </CardText>
        <Row>
          <Col sm="4" md="4" xs="4">
            <ChangeClientModal
              id={_id}
              name={name}
              city={city}
              address={address}
              phone={phone}
              idCard={IDCard}
              email={email}
            />
          </Col>
          <Col sm="4" md="4" xs="4">
            <DeleteClientModal id={_id} name={name} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
