import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";

const DeleteAnswerModal = ({ id }) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = (e) => {
    e.preventDefault()

    const deleteData = {
      id,
    }

    console.log(id)
    fetch('http://localhost:3500/deleteAnswer', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(deleteData),
    }).then((result) => {
      console.log(result)
      window.location.reload();
    }).catch((error) => console.log(error))

  }

  return (
    <div>
      <Button color="danger" outline size="sm" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete Answer
        </ModalHeader>

        <ModalBody>Are you sure you want to delete this answer?</ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteAnswerModal;
