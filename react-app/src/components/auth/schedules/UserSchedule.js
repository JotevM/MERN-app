import React, { useState, useEffect } from "react";
import { Spinner, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import UserScheduleDetails from './UserScheduleDetails'


export default function UserSchedule() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


    const fetchSchedules = (id = localStorage.getItem("id")) => {
    fetch(`http://localhost:3500/requestsByUser/?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching requests");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {fetchSchedules() },[])

  if (loading) return <Spinner color="success" />;
  if (error) return <div>Error: {error}</div>;

  console.log("DATA", data.length);
  return (
    <div>
      {data && data.length === 0 ? (
        <p className="text-center display-4"> There are no requests </p>
      ) : (
        <React.Fragment>
          <p className="text-center display-4">User Schedule</p>
          <ListGroup>
            <ListGroupItem color="success">
              <Row>
                <Col sm="3" md="3" xs="6">
                  Client
                </Col>
                <Col sm="3" md="3" xs="6">
                  Date
                </Col>
                <Col sm="3" md="3" xs="6">
                  Time
                </Col>
              </Row>
            </ListGroupItem>
            {data &&
              data.map((request) => {
                return (
                  <UserScheduleDetails request={request} key={request._id} />
                );
              })}
          </ListGroup>
        </React.Fragment>
      )}
    </div>
  );
}
