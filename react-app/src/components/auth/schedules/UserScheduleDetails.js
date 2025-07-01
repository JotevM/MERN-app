import React from "react";
import { ListGroupItem, Row, Col, Button } from "reactstrap";
import UserApprovementModal from "./UserApprovementModal";
import UserDenialModal from "./UserDenialModal";

export default function UserScheduleDetails({ request }) {
  console.log("REQUEST", request);
  const { client, date, time } = request;

  return (
    <div>
      <ListGroupItem color="warning">
        <Row>
          <Col md="3" sm="3" xs="12">
            {client.name}
          </Col>
          <Col md="3" sm="3" xs="12">
            {new Date(date).toLocaleDateString()}
          </Col>
          <Col md="3" sm="3" xs="12">
            {time}:00
          </Col>
          <Col md="1" sm="1" xs="12">
            {/* <UserApprovementModal request={ request} />
                        <Button color="success" otiline>Accept </Button> */}

            <UserApprovementModal request={request} />
          </Col>
          <Col md="1" sm="1" xs="12">
            {/* <UserDenialModal request={request} /> */}
            <UserDenialModal request={request} />
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
