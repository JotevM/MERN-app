import React from "react";
import { Row, Col, ListGroupItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export default function ClientDetails({ client }) {
  const navigate = useNavigate();

  const handleViewRecords = () => {
    navigate("/records", { state: { client } });
  };

  return (
    <div>
      <ListGroupItem color="warning">
        <Row>
          <Col sm="3">{client.name}</Col>
          <Col sm="3">{client.city}</Col>
          <Col sm="3">{client.address}</Col>
          <Col sm="2" md="2">
            <Link
              to="/records"
              state={{ client }}
              onClick={handleViewRecords}
            >
              <i
                className="fa fa-book text-danger"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
