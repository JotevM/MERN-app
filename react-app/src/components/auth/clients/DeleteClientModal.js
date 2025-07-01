import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";

export default function DeleteClientModal({ id, name }) {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const toggle = () => setModal(!modal);

  const handleDelete = (e) => {
    e.preventDefault();

    const requestData = { id };
    fetch("http://localhost:3500/deleteClient", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(requestData),
    })
      .then((result) => {
        toggle();
        console.log(result);
        navigate('/clients');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        Delete
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete client
        </ModalHeader>
        {error && (
          <pre>
            <span className="text-center">
              <Alert color="danger"> {error} </Alert>{" "}
            </span>
          </pre>
        )}
        <ModalBody>Are you sure you want to delete client {name}</ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
