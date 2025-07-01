import React, { useState, useEffect } from "react";
import { Spinner, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ReservationDetails from "./ReservationDetails";



export default function Reservation() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([])



  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = () => {

      fetch("http://localhost:3500/schedules")
      .then((responseData) => responseData.json())
      .then((data)=>{
        console.log(data)
        setData(data)
        setSchedules(data.schedules)
        setLoading(false)
      })
      .catch ((error) => {
      setError(error);
      setLoading(false);
    })
  };

  useEffect(() => {
    console.log("DATAAAAAAA SCHEDULES", data && data.schedules);
  }, [data]);

  if (loading) return <Spinner color="success" />;

  if(data) {
    console.log(data)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div>
      <ListGroup>
        <ListGroupItem color="danger">
          <Row>
            <Col sm="3" md="3">
              Date
            </Col>
            <Col sm="3" md="3">
              Time
            </Col>
            <Col sm="4" md="4">
              Client
            </Col>
          </Row>
        </ListGroupItem>

        {data.length > 0 ? (
          data.map((schedule) => (
            <ReservationDetails schedule={schedule} key={schedule._id} />
        )) 
        ) : (<p>No schedules found.</p>)}
      </ListGroup>
    </div>
  );
}
