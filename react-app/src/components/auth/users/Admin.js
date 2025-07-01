import React, { useContext } from "react";
import Users from "./Users";
import Clients from "../clients/Clients";
import AuthContext from "../../../context/auth-context";
import { Spinner } from "reactstrap";
import AuthLogin from "../../AuthLogin";

export default function Admin() {
  const context = useContext(AuthContext);
  console.log(context.token, context.role)
  
  if (context.token === "") {
    return <AuthLogin />;
  }

  if (context.role === "admin") {
    return <Users />;
  }

  if (context.role === "user") {
    return <Clients />;
  }

  //return <Spinner color="primary" />;
}
