import React from "react";

const context = React.createContext({
  token: "",
  setToken: () => {},
  name: "",
  setName: () => {},
  role: "",
  setRole: () => {},
  tokenExpiration: "",
  setTokenExpiration: () => {},

  logout: () => {},
});

export default context;
