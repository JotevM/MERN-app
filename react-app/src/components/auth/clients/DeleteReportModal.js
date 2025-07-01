import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function DeleteReportModal({ repId, forceUpdateComp }) {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = (e) => {
    e.preventDefault();

    const deleteData = {
      id: repId
    }

    fetch('http://localhost:3500/deleteReport', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })
      .then((result) => {
        console.log(result)
        toggle();
        forceUpdateComp();
        
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete report</ModalHeader>
        <ModalBody>Are you sure you want to delete report</ModalBody>
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
