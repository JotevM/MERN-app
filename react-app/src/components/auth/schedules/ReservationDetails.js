import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap";
export default function ReservationDetails({ schedule }) {
  console.log("reservation details", schedule)
  return (
    <div>
      <ListGroupItem color="warning">
        <Row>
          <Col sm="3" md="3">
            {" "}
            {new Date(schedule.date).toLocaleDateString()}{" "}
          </Col>
          <Col sm="3" md="3">
            {" "}
            {schedule.time}:00
          </Col>
          <Col sm="4" md="4">
            {" "}
            {schedule.client?.name}{" "}
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
