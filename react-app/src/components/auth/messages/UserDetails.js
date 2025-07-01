import React, { useState } from "react";

import { ListGroupItem } from "reactstrap";
import ClientPopover from "./ClientPopover";

export default function UserDetails({ user }) {
  return (
    <div>
      <ListGroupItem size="sm" color="secondary">
        <ClientPopover user={user} />
        {/* <span className="font-weight-bold" style={{ cursor:"pointer" }} id={ client.email }  > { client.name} </span>      */}
      </ListGroupItem>
    </div>
  );
}
