import React from "react";
import { ListGroupItem, Row, Col } from "reactstrap";

export default function AccountDetails({ account }) {
  return (
    <div>
      <ListGroupItem color="warning">
        <Row>
          <Col sm="4" md="4">
            {account.accountType}
          </Col>
          <Col sm="4" md="4">
            {account.accountNumber}
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
