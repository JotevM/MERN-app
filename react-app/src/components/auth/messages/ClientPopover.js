import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth-context";
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
import AddClientMessage from "./AddClientMessage";

export default function ClientPopover({ user }) {
  useEffect(() => {
    if (!loading) {
      animateScroll.scrollToBottom({
        containerId: "popover",
      });
    }
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const { _id, name } = user;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const clientId = localStorage.getItem("id")
  const userId = user._id

  console.log(user._id, clientId)


  const fetchMessages = async () => {
    const requestData = {
      userId,
      clientId
    };

    try {
      const response = await fetch('http://localhost:3500/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages.');
      }
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [])


  // const [ name, setName ]=useState(client.name)
  if (loading) return "Loading...";
  const toggle = () => setPopoverOpen(!popoverOpen);
  // const name=client.name
  // console.log("CONTEXT", context.id)
  return (
    <div>
      <span
        className="font-weight-bold"
        id={"Popover-" + _id}
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        {user.name}
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
        <PopoverHeader className="bg-danger text-white ">{name}</PopoverHeader>
        <PopoverBody id="popover" className="text-white popover-content">
          {data && data.map((message) => {
            console.log("MESSAGE", message);
            return (
              <React.Fragment>
                <ListGroup>
                  <ListGroupItem
                    color={message.sender === "user" ? "danger" : "warning"}
                  >
                    <p className="font-italic" style={{ fontSize: "0.8em" }}>
                      {" "}
                      {new Date(message.date).toLocaleDateString()}{" "}
                      {new Date(message.date).getHours()}:
                      {new Date(message.date).getMinutes()}
                      <span className="mx-1">
                        {message.sender === "user"
                          ? message.user.name
                          : message.client.name}
                      </span>{" "}
                    </p>
                    <p> {message.message} </p>
                    <hr />
                  </ListGroupItem>
                </ListGroup>
              </React.Fragment>
            );
          })}
          <AddClientMessage
            userId={user._id}
            clientId={localStorage.getItem("id")}
          />
        </PopoverBody>
      </Popover>
    </div>
  );
}
