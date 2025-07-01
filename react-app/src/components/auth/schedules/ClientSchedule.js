import React, { useState, useEffect, useContext } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import { FormGroup, Form, Label, Input, Button, Row, Col } from "reactstrap";
import Scheduler from "./Scheduler";

export default function ClientSchedule() {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  }, []);
  const [user, setUser] = useState("");

  const [cuser, setCuser] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [ordinaryUsers, setOrdinaryUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrdinaryUsers();
  }, []);

  //PROVERI
  const fetchOrdinaryUsers = async () => {
    try {
      const response = await fetch("http://localhost:3500/ordinaryUsers", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setOrdinaryUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ordinary users:", error);
    }
  };

  const getDates = () => {
    let dates = [];
    for (let i = 0; i < 30; i++) {
      let d = new Date();
      let x = d.setDate(d.getDate() + i);
      dates[i] = new Date(x).toISOString();
    }
    return dates;
  };

  return (
    <div className="container">
      <h1>Schedule</h1>

      <Row>
        <Col sm="4" md="4" xs="4">
          <Label className="mr-3">Choose clerk</Label>
          <Input
            type="select"
            className="border-warning"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          >
            <option></option>
            {ordinaryUsers &&
              ordinaryUsers.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {" "}
                    {user.name}{" "}
                  </option>
                );
              })}
          </Input>
          <p className="mt-3">
            Then, choose free date and time and accept your choice
          </p>
          <p>
            <span className="text-danger font-weight-bold small">
              <strong>
              {" "}
              CAUTION:{" "}
              </strong>
            </span>
            You can choose date and time only once per day
          </p>
          <div className="d-flex justify-content-center">
          <div>
            <h5 className="text-center mb-4">Legend</h5>
            <div className="d-flex mb-4">
              <div
                className="text-center text-white py-4 border border-light"
                style={{
                  width: "75px",
                  height: "25px",
                  borderRadius: "15px",
                  backgroundColor: "#FFA500",
                  opacity: "0.7",
                }}
              >
                <p className="m-0">Weekend</p>
              </div>
          
              <div
                className="text-center text-white py-4 border border-light ml-3"
                style={{
                  width: "75px",
                  height: "25px",
                  borderRadius: "15px",
                  backgroundColor: "red",
                  opacity: "0.7",
                }}
              >
                <p className="m-0">Taken</p>
              </div>
          
              <div
                className="text-center text-white py-4 border border-light ml-3"
                style={{
                  width: "75px",
                  height: "25px",
                  borderRadius: "15px",
                  backgroundColor: "green",
                  opacity: "0.7",
                }}
              >
                <p className="m-0">Free</p>
              </div>
            </div>
          </div>
        </div>
        </Col>
        <Col sm="8" md="8" xs="12">
          <div style={{ height: "500px", overflow: "scroll" }}>
            {getDates().map((date, i) => {
              if (user === "") return null;
              return (
                <Scheduler
                  setDate={setDate}
                  setTime={setTime}
                  setCuser={setCuser}
                  user={user}
                  date={date}
                  key={i}
                />
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
