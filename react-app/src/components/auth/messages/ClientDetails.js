import React, { useState } from "react";

import { ListGroupItem } from "reactstrap";
import UserPopover from "./UserPopover";

import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
export default function ClientDetails({ client }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <ListGroupItem size="sm" color="secondary">
        <UserPopover client={client} key={client._id} />
        {/* <span className="font-weight-bold" style={{ cursor:"pointer" }} id={ client.email }  > { client.name} </span>      */}
      </ListGroupItem>
    </div>
  );
}
