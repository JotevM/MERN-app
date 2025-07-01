import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default function ChangeReportModal({ report, forceUpdateComp }) {
  const [date, setDate] = useState(report.date);
  const [description, setDescription] = useState(report.description);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setDate(report.date);
    setDescription(report.description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      id: report._id,
      date,
      description
    }

    fetch('http://localhost:3500/updateReport', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((result) => {
        toggle();
        forceUpdateComp();
        
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button color="warning" outline onClick={toggle}>
        Change
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change report</ModalHeader>
        {error && (
          <pre>
            <span className="text-center">
              <Alert color="danger"> {error} </Alert>{" "}
            </span>
          </pre>
        )}
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                className="border border-warning rounded"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                className="border border-warning rounded"
                rows="7"
                cols="40"
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit" outline>
              Change
            </Button>{" "}
            <Button color="danger" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
