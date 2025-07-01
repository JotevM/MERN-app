import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function DeleteUserModal({ id, name }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null)

  const toggle = () => setModal(!modal);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(id, name)
    
    const requestData = { id }
    fetch(`http://localhost:3500/deleteUser`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(requestData)
    })
      .then((data) => {
        console.log(data);
        toggle();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <i
        className="fa fa-trash text-danger"
        style={{ cursor: "pointer" }}
        onClick={toggle}
      />{" "}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete user
        </ModalHeader>
        <ModalBody>Are you sure you want to delete user {name}</ModalBody>
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

