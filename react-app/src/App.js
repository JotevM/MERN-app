import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import AuthContext from "./context/auth-context";
import {
  BrowserRouter as Router,
  Route,     
  Routes,
  Navigate,
} from "react-router-dom";
import AuthLogin from "./components/AuthLogin";
import Admin from "./components/auth/users/Admin";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import ChangeUserPassword from "./components/auth/users/ChangeUserPassword";
import AddUser from "./components/auth/users/AddUser";
import AddClient from "./components/auth/clients/AddClient";
import Clients from "./components/auth/clients/Clients";
import Records from "./components/auth/clients/Records";
import Forum from "./components/auth/forum/Forum";
import Messages from "./components/auth/messages/Messages";
import ClientSchedule from "./components/auth/schedules/ClientSchedule";
import UserSchedule from "./components/auth/schedules/UserSchedule";
import Account from "./components/auth/clients/Account";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/auth/users/Users";
import Footer from "./components/pages/Footer";
import About from "./components/pages/About";
import SavingAccount from './components/pages/SavingAccount';
import CashLoan from "./components/pages/CashLoan";
import StandingOrder from "./components/pages/StandingOrder";
//import Reservation from "./components/auth/schedules/Reservation";

function App(props) {

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [tokenExpiration, setTokenExpiration] = useState(() => localStorage.getItem("tokenExpiration") || "");
  
  const context = useContext(AuthContext);
  
  const logout = () => {
    console.log("Logged out");
    setName("");
    setRole("");
    setToken("");
    setTokenExpiration("");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    console.log("Name", context.name);
    console.log("Token", context.token);
  };
  
  return (
    <div>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          name,
          setName,
          role,
          setRole,
          tokenExpiration,
          setTokenExpiration,
          logout,
        }}
      >
        <Header />
        <div className="cont">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/authLogin" element={<AuthLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin"
              element={
                token !== null ? (
                  <Admin />
                ) : (
                  <Navigate to="/authLogin" replace />
                )
              }
            />
            <Route
              path="/users"
              element={
                role === "admin" && token !== null ? (
                  <Users />
                ) : (
                  <Navigate to="/authLogin" replace />
                )
              }
            />
            <Route
              path="/addUser"
              element={
                role === "admin" && token !== null ? (
                  <AddUser />
                ) : (
                  <Navigate to="/authLogin" replace />
                )
              }
            />
            <Route
              path="/changeUserPassword"
              element={
                token !== "" ? (
                  <ChangeUserPassword />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/addClient"
              element={
                role === "user" && token !== null ? (
                  <AddClient />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/clients"
              element={
                role === "user" && token !== null ? (
                  <Clients />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/forum" element={<Forum />} />
            <Route path="/records" element={<Records />} />
            <Route
              path="/messages"
              element={
                token !== "" ? (
                  <Messages />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/clientSchedule"
              element={
                role === "client" && token !== "" ? (
                  <ClientSchedule />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/userSchedule"
              element={
                role === "user" && token !== null ? (
                  <UserSchedule />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/account"
              element={
                role === "client" && token !== "" ? (
                  <Account />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/savingAccount" element={<SavingAccount />} />
            <Route path="/cashLoan" element={<CashLoan />} />
            <Route path="/standingOrder" element={<StandingOrder />} />
          </Routes>
        </div>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;