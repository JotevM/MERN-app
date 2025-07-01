import React, { useState, useContext, useEffect} from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {useNavigate} from "react-router-dom"
import {
  Row,
  Col,
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
  DropdownItem,
} from "reactstrap";

export default function ChangeClientModal({
  id,
  name,
  city,
  address,
  phone,
  idCard,
  email,
}) {

  console.log(id, name, city, address, phone, idCard, email)

  const context = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    checkToken(context);
  }, []);

  console.log("ID", id);

  const [newname, setName] = useState(name);
  const [newcity, setCity] = useState(city);
  const [newaddress, setAddress] = useState(address);
  const [newphone, setPhone] = useState(phone);
  const [newemail, setEmail] = useState(email);
  const [newidCard, setidCard] = useState(idCard);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('')


  const toggle = () => {
    setModal(!modal);
    /*setName(name);
    setCity(city);
    setAddress(address);
    setPhone(phone);
    setidCard(idCard)
    setEmail(email);*/
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestData = {
      id,
      newname,
      newcity,
      newaddress,
      newphone,
      newidCard,
      newemail,
    }
    fetch('http://localhost:3500/updateClient', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((result) => {
        console.log("UPDATED", result);
        toggle();
        navigate('/clients')
      })
      .catch((error) => console.log("err", error));
  };

  return (
    <div>
      {context.role === "Client" ? (
        <DropdownItem onClick={toggle}>Update your profile</DropdownItem>
      ) : (
        <Button color="warning" outline onClick={toggle}>
          Change
        </Button>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-warning" toggle={toggle}>
          {context.role === "user" ? "Change client data" : "Change your data"}
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
              <Label>Name</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={newname}
              />
            </FormGroup>
            <FormGroup>
              <Label>City</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={newcity}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={newaddress}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={newphone}
              />
            </FormGroup>
            <FormGroup>
              <Label>ID Card</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setidCard(e.target.value)}
                value={newidCard}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                className="border-warning"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={newemail}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-start">
            <Button color="success" outline type="submit">
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
