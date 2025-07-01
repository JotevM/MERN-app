import React, { useState, useEffect, useContext } from "react";
import {
  Spinner,
  ListGroup,
  Collapse,
  Button,
  CardBody,
  Card,
} from "reactstrap";
import AuthContext from "../../../context/auth-context";
import QuestionDetails from "./QuestionDetails";
import AddQuestion from "./AddQuestion";

export default function Forum() {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:3500/questions')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setQuestions(data.questions);
        setLoading(false);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      })
  }

  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  if (loading) return <Spinner color="success" />;
  if (data) {
    console.log(data);
  }
  if (error) return <p>Error: {error.message}</p>;

  console.log(data)
  //console.log(questions)

  return (
    <div className="container">
      <h1>Forum</h1>
      {context.role !== "user" && (
        <React.Fragment>
          <p>
            Ask our clerk any question and they will answer you as soon as
            possible
          </p>
          <Button
            color="warning"
            outline
            onClick={toggle}
            style={{ marginBottom: "1rem" }}
          >
            {!isOpen ? "Ask" : "Close"}
          </Button>
        </React.Fragment>
      )}

      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <AddQuestion toggle={toggle} />
          </CardBody>
        </Card>
      </Collapse>

      <ListGroup>
        {data.length > 0 ? (
          data.map((question) => (
            <QuestionDetails question={question} key={question._id} />
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </ListGroup>
    </div>
  );
}
