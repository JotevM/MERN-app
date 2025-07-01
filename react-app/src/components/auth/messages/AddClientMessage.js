import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function AddClientMessage({ userId, clientId }) {

  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("")
  const [read, setRead] = useState("")


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      setMessage("")
    }
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestData = {
      user: userId,
      client: clientId,
      message,
      sender: "client",
      read: false,
    }

    console.log(message, sender, read)


    fetch('http://localhost:3500/createMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((data) => {
        console.log(data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
      });

  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          className="border*warning"
          type="textarea"
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button hidden type="submit"></Button>
      </Form>
    </div>
  );
}
