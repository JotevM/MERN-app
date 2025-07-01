import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
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

const ChangeAnswerModal = ({ answ }) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context)
  })

  console.log("ANSWER", answ.answer);
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState(answ.answer);

  const toggle = () => {
    setModal(!modal);
    setAnswer(answ.answer);
  };

  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const answerData = {
      id: answ._id,
      answer,
    }
    console.log(answ._id, answer)
    fetch('http://localhost:3500/updateAnswer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(answerData),
    }).then((result) => {
      toggle();
      //setAnswer("");
      setError(null)
      window.location.reload();
    }).catch((err) => console.log(err));


  };

  return (
    <div>
      <Button color="warning" className="mr-2" outline size="sm" onClick={toggle}>
        Change
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-warning" toggle={toggle}>
          Change answer
        </ModalHeader>
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
              <Label>Previous answer: </Label>
              <Input
                type="textarea"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" outline type="submit">
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
};

export default ChangeAnswerModal;
