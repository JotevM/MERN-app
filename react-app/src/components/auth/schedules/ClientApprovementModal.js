import { setDate } from "date-fns";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

export default function ClientApprovementModal(props) {
  console.log("PROPS IN MODAL", props);
  const { i, user, date } = props;
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const toggle = () => setModal(!modal);

  const onlyDate = date.substring(0, 10)

  console.log(onlyDate, "DAAAAAAAAAAAATEEEEEEEEE iz clientApprovedModal")

  const getTime = () => {
    // return "1"+i
    return 10 + i;
  };

  const ApproveRequest = () => {
    let time = 10 + i;

    const requestData = {
        user,
        client: localStorage.getItem("id"),
        date: onlyDate,
        time,
    };

    fetch('http://localhost:3500/requestSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("REQUEST", data);
        toggle();
      })
      .catch(err => {
        console.log(err)
        setDate("")
        setError(err.message)
      })
  };

  return (
    <div>
      <div
        className="bg-success text-center text-white py-4 border border-light"
        style={{
          width: "75px",
          height: "25px",
          cursor: "pointer",
          borderRadius: "15px",
        }}
        onClick={toggle}
      >
        {10 + i}:00{" "}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        {error && (
          <pre>
            {" "}
            <span className="text-center">
              {" "}
              <Alert className="mx-3" color="danger">
                {" "}
                {error.message}{" "}
              </Alert>{" "}
            </span>
          </pre>
        )}
        <ModalHeader toggle={toggle}>New Appointment</ModalHeader>
        <ModalBody>
          Are you sure you want to send request for date {}
          {new Date(date).toLocaleDateString()} at {getTime()} :00?
        </ModalBody>
        <ModalFooter>
          <Button color="success" outline onClick={ApproveRequest}>
            Send
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
