import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
  ListGroupItem
} from "reactstrap";
import Reports from "./Reports";
import Basic from "./Basic";
import AccountDetails from "./AccountDetails";
import UserStaticSchedule from "../schedules/UserStaticSchedule";
import MakeAppointment from "../schedules/MakeAppointment";

export default function Records() {

  const location = useLocation();
  const { client } = location.state;

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(context);
    if (context.token === "" && !client) {
      navigate("/");
    }
  }, []);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  //-------------------------Acounts---------------------------

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = (clientId = client._id) => {
    fetch(`http://localhost:3500/findBankAccounts?id=${clientId}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching accounts");
        }
        return response.json();
      })
      .then((data) => {
        setAccounts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  //-----------------------------------------------------------

  return (
    <div>
      <h2 className="text-center my-4" style={{ fontWeight: "300" }}>
        <strong>
        Client: {client && client.name}
        </strong>
      </h2>
      <Nav tabs className="d-flex justify-content-center">
        <NavItem>
          <NavLink
            className="bg-warning text-white "
            onClick={() => {
              toggle("1");
            }}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Basics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="bg-warning text-white"
            onClick={() => {
              toggle("2");
            }}
            style={{ cursor: "pointer" }}
          >
            Reports
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="bg-warning text-white"
            onClick={() => {
              toggle("3");
            }}
            style={{ cursor: "pointer" }}
          >
            Account
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm={{ size: 4, offset: 4 }} md={{ size: 4, offset: 4 }}>
              <Basic clientD={client} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Reports client={client} />
        </TabPane>
        <TabPane tabId="3" className="container">
          <Row>
            <Col sm="12">
              <Card body>
                <ListGroupItem color="danger">
                  <Row>
                    <Col sm="4" md="4">
                      Account type
                    </Col>
                    <Col sm="4" md="4">
                      Account number
                    </Col>
                  </Row>
                </ListGroupItem>
                {accounts.map((account) => (
                  <AccountDetails account={account} key={account._id} />
                ))}
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}
