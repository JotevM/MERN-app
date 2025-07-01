import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { checkToken } from '../../../middleware/check-token';
import AuthContext from '../../../context/auth-context';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';

const AddClient = () => {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [upin, setUpin] = useState('');
  const [idCard, setIdcard] = useState('');
  const [email, setEmail] = useState('');
  const [bankAccounts, setBankAccounts] = useState([{ accountNumber: '', accountType: '' }]);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState()

  const navigate = useNavigate();

  const handleBankAccountChange = (index, field, value) => {
    setBankAccounts((prevBankAccounts) => {
      const updatedBankAccounts = [...prevBankAccounts];
      updatedBankAccounts[index][field] = value;
      return updatedBankAccounts;
    });
  };

  const handleAddBankAccount = () => {
    setBankAccounts((prevBankAccounts) => [
      ...prevBankAccounts,
      { accountNumber: '', accountType: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      name,
      city,
      address,
      phone,
      upin,
      idCard,
      email,
      bankAccounts,
      password,
    };

    fetch('http://localhost:3500/createNewClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status != 201) {
          return response.json().then(data => {
            throw new Error(data.message);
          });
        } else {
          throw new Error('An error occurred during login.');
        }
      })
      .then((data) => {
        console.log(data);
        setName('');
        setCity('');
        setAddress('');
        setPhone('');
        setUpin('');
        setIdcard('');
        setEmail('');
        setBankAccounts([]);
        setPassword('');
        setMessages([]);
        navigate('/clients')
      })
      .catch((error) => {
        console.log(error);
        setMessages([error]);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      {error && (
        <Alert color="danger">
          <span className="text-center">{error}</span>
        </Alert>
      )}
      <h2 className="my-4" style={{ fontWeight: '300' }}>
        Add new client:
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>Name</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>City</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>Address</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>Phone</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>UPIN</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setUpin(e.target.value)}
                value={upin}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>ID card</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setIdcard(e.target.value)}
                value={idCard}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>E-mail</Label>
              <Input
                className="border-left border-warning rounded"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>Bank Accounts</Label>
              {bankAccounts.map((account, index) => (
                <div key={index}>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Account Number</Label>
                      <Input
                        className="border-left border-warning rounded"
                        type="text"
                        value={account.accountNumber}
                        onChange={(e) =>
                          handleBankAccountChange(index, 'accountNumber', e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Account Type</Label>
                      <Input
                        className="border-left border-warning rounded"
                        type="select"
                        value={account.accountType}
                        onChange={(e) =>
                          handleBankAccountChange(index, 'accountType', e.target.value)
                        }
                        style={{ width: '215px' }}
                      >
                        <option value="" disabled={!account.accountType}>
                          Select account type
                        </option>
                        <option value="Current Account">Current Account</option>
                        <option value="Business Account">Business Account</option>
                        <option value="Fixed Deposit Account">Fixed Deposit Account</option>
                        <option value="Saving Account">Saving Account</option>
                        <option value="Money Market Account">Money Market Account</option>
                        <option value="Cheque">Cheque</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </div>
              ))}
              <Button color="warning" outline onClick={handleAddBankAccount}>
                Add Bank Account
              </Button>
            </FormGroup>
          </Col>
          <Col sm="4" md="4">
            <FormGroup>
              <Label>Password</Label>
              <Input
                className="border-left border-warning rounded"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="warning" outline>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddClient;
