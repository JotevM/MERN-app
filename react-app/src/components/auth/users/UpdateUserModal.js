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

export default function UpdateUserModal({ user }) {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [messages, setMessages] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setName(user.name);
    setUsername(user.username);
    setMessages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      id: user._id,
      name,
      username
    }
    const updateUser = async (req) => {
      try {
        const response = await fetch(`http://localhost:3500/updateUser`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(req),
        });

        if (!response.ok) {
          throw new Error("Failed to update user.");
        }

        toggle();
        window.location.reload();
      } catch (err) {
        setMessages([{ message: err.message }]);
      }
    };

    updateUser(requestData);
  };

  return (
    <div>
      <i
        className="fa fa-pencil color-primary"
        style={{ cursor: "pointer" }}
        onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-warning" toggle={toggle}>
          Change user
        </ModalHeader>
        {messages.length > 0 && (
          <pre>
            {messages.map(({ message }, i) => (
              <span key={i} className="text-center">
                <Alert color="danger"> {message} </Alert>
              </span>
            ))}
          </pre>
        )}
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                className="border border-warning"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                className="border border-warning"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" outline type="submit">
              Change
            </Button>{" "}
            <Button color="secondary" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

