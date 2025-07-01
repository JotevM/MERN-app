import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

export default function UserApprovementModal({ request }) {
  const { _id, user, client, date, time } = request;
  console.log("REQUEST", request);

  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);

  const toggle = () => setModal(!modal);

  const handleRequest = () => {
    console.log("REQU", _id, user._id, client._id, date, time);

    fetch("http://localhost:3500/createSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        client: client._id,
        date,
        time,
      }),
    })
      .then((response) => {
        toggle();
        if (!response.ok) {
          throw new Error("Error creating schedule");
        }

        console.log(_id)

        return fetch(`http://localhost:3500/deleteRequestById`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: _id,
          }),
        });
      })
      .then((response) => {
        window.location.reload();
        if (!response.ok) {
          throw new Error("Error deleting request schedule");
        }

        const day = new Date(date).toLocaleDateString();
        const message = `Your appointment has been approved for the day ${day} at ${time}:00`;

        return fetch("http://localhost:3500/createMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user._id,
            client: client._id,
            message,
            sender: "user",
            read: true,
          }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error creating message");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        toggle();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <Button color="success" outline onClick={toggle}>
        Accept
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        {error && (
          <pre>
            {" "}
            <span className="text-center">
              {" "}
              <Alert color="danger"> {error} </Alert>{" "}
            </span>
          </pre>
        )}
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Are you sure you want to accept this request?</ModalBody>
        <ModalFooter>
          <Button color="success" outline onClick={handleRequest}>
            Accept
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}