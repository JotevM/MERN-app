import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Form,
  Badge,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import AuthLogin from "../AuthLogin";
import Reservation from "../auth/schedules/ReservationModal";
import ChangeClientModal from "../auth/clients/ChangeClientModal";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(0);
  const [clientData, setClientData] = useState(null);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const findUnreadMessagesByUser = async (id) => {
    const response = await fetch(`http://localhost:3500/findUnreadMessagesByUser?id=${id}`);
    const data = await response.json();
    return data;
  };

  const findClient = async (id) => {
    const response = await fetch(`http://localhost:3500/findClient?id=${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const messagesData = await findUnreadMessagesByUser(localStorage.getItem("id"));
      const clientData = await findClient(localStorage.getItem("id"));

      let unreadMessages = 0;

      if (messagesData) {
        unreadMessages = messagesData;
      }

      setNumber(unreadMessages);

      if (clientData) {
        setClientData(clientData);
        console.log("CLIENT DATA", clientData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    context.logout();
    navigate('/');
  };

  return (
    <div>
      <Navbar color="warning" dark expand="md" className="py-2 mb-4">
        <NavbarBrand tag={Link} to="/">
          <h2
            className="text-white  text-center"
            style={{ fontFamily: "Arial Black , sans-serif" }}
          >
            tf-Banking
          </h2>
        </NavbarBrand> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {context.role === "admin" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/adduser">
                    Add user
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin">
                    Users
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
            {context.role !== "admin" &&
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/about" >About us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/forum" >Forum</NavLink>
                </NavItem>
              </React.Fragment>
            }

            {context.role === "user" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/addClient">
                    New client
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/clients">
                    Clients
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}


            {(context.role === "user" || context.role === "client") && (
              <NavItem>
                <NavLink tag={Link} to="/messages">
                  Messages
                  {context.role === "user" && number !== 0 && (
                    <Badge color="secondary">{number}</Badge>
                  )}
                </NavLink>
              </NavItem>
            )}

            {context.role === "client" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/clientSchedule" >
                    Schedule
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} to="/account" >
                    My account
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}

            {context.role === "user" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/userSchedule">
                    Schedule
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Reservation />
                  {/* <NavLink tag={ Link} to="reservation">Reservation</NavLink> */}
                </NavItem>
              </React.Fragment>
            )}

            {!context.token ? null : (
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret>
                  {context.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/changeUserPassword" >
                    Change password
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
          {!context.token && (
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Button
                  color="light"
                  outline size="sm"
                  tag={Link}
                  to="/login"
                >
                  Login
                </Button>
              </NavItem>
              <NavItem>
                <span style={{ marginRight: '10px' }}></span>
              </NavItem>
              <NavItem>
                <Button
                  color="light"
                  outline size="sm"
                  tag={Link}
                  to="/signup"> SignUp
                </Button>
              </NavItem>
            </Nav>
          )}
          {/* <NavbarText>{ context.name }</NavbarText> */}
        </Collapse>
      </Navbar>

      <Row>
        <Col sm="2" xs="12">
          <img src="tfBanking.png" width="100" height="100" />
        </Col>
        <Col sm={{ size: "2", offset: "3" }} xs="12" className="mt-4">
        </Col>

      </Row>
    </div>
  );
}


