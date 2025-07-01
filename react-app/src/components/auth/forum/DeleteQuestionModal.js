import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

export default function DeleteQuestionModal({ id }) {

  const context = useContext(AuthContext)

  useEffect(() => {
    checkToken(context);
  });

  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {

    const questionData = {
      id,
    }

    console.log(id)
    fetch('http://localhost:3500/deleteQuestion', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(questionData),
    }).then((result) => {
      toggle()
      window.location.reload();
    }).catch((error) => console.log(error))

  }
  return (
    <div>
      <Button color="danger" size="sm" outline onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete question
        </ModalHeader>
        {error && (
          <pre>
            <span className="text-center">
              <Alert color="danger"> {error} </Alert>{" "}
            </span>
          </pre>
        )}
        <ModalBody>Are you sure you want to delete this question?</ModalBody>
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
