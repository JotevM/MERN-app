import React, { useState, useContext, useEffect } from "react";
import { animateScroll } from "react-scroll";
import {
  Form,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import AddUserMessage from "./AddUserMessage";
import AuthContext from "../../../context/auth-context";

export default function UserPopover({ client }) {
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "popover",
    });
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const { _id, name } = client;
  const context = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("id");
  const clientId = client._id

  const findUnreadMessagesByUser = async () => {
    try {
      const response = await fetch(`http://localhost:3500/findUnreadMessagesByUser?id=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const findUnreadMessagesByUserAndClient = async () => {
    try {
      const response = await fetch(`http://localhost:3500/findUnreadMessagesByUserAndClient?user=${userId}&client=${_id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUnreadMessages = async () => {
    try {
      await fetch(`http://localhost:3500/updateMessages`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, client: client._id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:3500/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, clientId }),
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  ;

  const fetchData = async () => {
    await Promise.all([
      findUnreadMessagesByUser(),
      findUnreadMessagesByUserAndClient(),
      updateUnreadMessages(),
      getMessages()
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => {
    setPopoverOpen(!popoverOpen);
    updateUnreadMessages();
  };

  return (
    <div>
      <span
        className="font-weight-bold"
        id={"Popover-" + _id}
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        {client.name}
        {messages.length > 0 ? (
          <span style={{ fontSize: "3em", color: "red" }}> . </span>
        ) : (
          ""
        )}
      </span>

      <Popover
        className="mx-5"
        placement="right"
        isOpen={popoverOpen}
        target={"Popover-" + _id}
        toggle={toggle}
        trigger="legacy"
        color="danger"
      >
        <PopoverHeader className="bg-danger text-white">{name}</PopoverHeader>
        <PopoverBody id="popover" className=" text-white popover-content">
          {messages && messages.map((message) => {
            console.log("MESSAGE", message)
            return (
              <React.Fragment>
                <ListGroup>
                  <ListGroupItem
                    //</ListGroup>className={`border-0 bg-transparent text-white ${message.user._id === userId ? "text-right" : ""
                    //}`}
                    color={message.sender === "client" ? "danger" : "warning"}
                  >
                    <p className="font-italic" style={{ fontSize: "0.8em" }}>
                      {" "}
                      {new Date(message.date).toLocaleDateString()}{" "}
                      {new Date(message.date).getHours()}:
                      {new Date(message.date).getMinutes()}:
                      <span className="mx-1">
                        {message.sender === "client"
                          ? message.client.name
                          : message.user.name}
                      </span>{" "}
                    </p>
                    <p> {message.message} </p>
                    <hr />
                  </ListGroupItem>
                </ListGroup>
              </React.Fragment>
            );
          })}
          <AddUserMessage userId={localStorage.getItem("id")} clientId={client._id} />
        </PopoverBody>
      </Popover>
    </div>
  );
}
