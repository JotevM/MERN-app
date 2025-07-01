import React, { useState, useContext, useEffect } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import ReportDetail from "./ReportDetail";
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Spinner,
  Row,
  Col,
  CardGroup,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Card,
  Button,
  Collapse,
} from "reactstrap";
import AddReport from "./AddReport";

export default function Reports() {

  const location = useLocation();
  const { client } = location.state;

  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(context);
    if (context.token === "") {
      navigate('/');
    }
    fetchReports();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const id = client._id;
  const fetchReports = (clientId = id) => {
    fetch(`http://localhost:3500/reports?id=${clientId}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching reports");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  };


  const forceUpdateComp = () => {
    console.log("UPDDDDDD");
    fetchReports();
  };

  if (loading) return <Spinner color="success" />;

  return (
    <div>
      <h2 className="display-5 text-center">Reports</h2>
      <Button
        color="warning"
        outline
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        {!isOpen ? "New Report" : "Close"}
      </Button>
      <Collapse isOpen={isOpen}>
        <AddReport
          id={client._id}
          forceUpdateComp={forceUpdateComp}
          toggle={toggle}
        />
      </Collapse>

      <Row>
        {data.map((report) => (
          <ReportDetail
            report={report}
            forceUpdateComp={forceUpdateComp}
            id={client._id}
            key={report._id}
          />
        ))}
      </Row>
    </div>
  );
}
