import React, { useContext, useEffect } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import UserMessages from "./UserMessages";
import ClientMessages from "./ClientMessages";
import Home from "../../pages/Home";
export default function Messages() {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  }, []);
  return (
    <div>
      <h1></h1>
      {context.role === "user" ? (
        <UserMessages />
      ) : context.role === "client" ? (
        <ClientMessages />
      ) : (
        <Home />
      )}
    </div>
  );
}
