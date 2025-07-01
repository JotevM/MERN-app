import React, { useState, useContext, useEffect } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";

export default function MakeAppointment(client, history) {
  const context = useContext(AuthContext);

  console.log(client, history)

  useEffect(() => {
    checkToken(context);
  });

  if (context.token === "") {
    history.push("/");
  }

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATE AND TIME", date, time);


    const requestData = {
      user: localStorage.getItem("id"),
      client: client.id,
      date,
      time: parseInt(time),
    };

    fetch("http://localhost:3500/requestSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error creating schedule");
        }
      })
      .then(() => {
        console.log("Appointment suggested successfully");
        setDate("");
        setTime("");
      })
      .catch((error) => {
        setMessages([error.message]);
        console.log(error);
      });
  };

  const handleCancel = () => {
    setDate("");
    setTime("");
    setMessages([]);
  };

  return (
    <div>
      {messages.length > 0 && (
        <pre>
          {messages.map((message, i) => (
            <span key={i} className="text-center">
              <Alert color="danger">{message}</Alert>
            </span>
          ))}
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Date</Label>
          <Input
            className="border-warning"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </FormGroup>

        <FormGroup>
          <Label>Time</Label>
          <Input
            className="border-warning"
            type="select"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option></option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
          </Input>
        </FormGroup>

        <Button className="mt-4" color="success" outline type="submit">
          {" "}
          Make appointment{" "}
        </Button>
        {"   "}
        <Button className="mt-4" color="danger" onClick={handleCancel} outline>
          {" "}
          Cancel{" "}
        </Button>
      </Form>
    </div>
  );
}