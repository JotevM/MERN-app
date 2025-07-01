import React, { useState, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import AddAnswer from "./AddAnswer";
import { ListGroupItem, Collapse, Card, CardBody, Button } from "reactstrap";
import AnswerDetails from "./AnswerDetails";
import DeleteQuestionModal from "./DeleteQuestionModal";

export default function QuestionDetails({ question }) {
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  console.log("QuestionDetails - answer:", question.answers);

  return (
    <div className="mb-5">
      <ListGroupItem color="dark">
        <p className="font-italic" style={{ fontSize: "0.8em" }}>
          {new Date(question.questionDate).getHours()}:
          {new Date(question.questionDate).getMinutes()}{" "}
          {new Date(question.questionDate).toLocaleDateString()}{" "}
          <span className="font-weight-bold">{question.name}</span>{" "}
        </p>
        {question.question}
        {context.role === "user" && (
          <React.Fragment>
            <div className="d-flex mt-3">
              <Button
                size="sm"
                className="mr-2"
                color="success"
                outline
                onClick={toggle}
                style={{ marginBottom: "1rem" }}
              >
                Answer
              </Button>
              <DeleteQuestionModal id={question._id} />
            </div>

            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <AddAnswer id={question._id} toggle={toggle} /> { }
                </CardBody>
              </Card>
            </Collapse>
          </React.Fragment>
        )}
      </ListGroupItem>
      {Array.isArray(question.answers) && question.answers.length === 0 ? (
        <ListGroupItem color="warning">
          Someone will be answering soon
        </ListGroupItem>
      ) : (
        Array.isArray(question.answers.resolvedAnswers) && question.answers.resolvedAnswers.map((answer) => (
          <AnswerDetails answer={answer} key={answer._id} />
        ))
      )}
    </div>
  );
}
