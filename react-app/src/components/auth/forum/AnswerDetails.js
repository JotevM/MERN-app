import React, { useContext } from "react";
import { ListGroupItem } from "reactstrap";
import ChangeAnswerModal from "./ChangeAnswerModal";
import DeleteAnswerModal from "./DeleteAnswerModal";
import AuthContext from "../../../context/auth-context";
export default function AnswerDetails({ answer }) {

  console.log("AnswerDetails - answer:", answer);
  const context = useContext(AuthContext);
  return (
    <div>
      <ListGroupItem color="secondary">
        <p className="font-italic" style={{ fontSize: "0.8em" }}>
          {" "}
          {new Date(answer.answerDate).getHours()}:
          {new Date(answer.answerDate).getMinutes()}{" "}
          {new Date(answer.answerDate).toLocaleDateString()}{" "}
          <span className="font-weight-bold">
            {" "}
            {answer.user.name} <img src="tfBanking.png" width="20" height="20" />
          </span>{" "}
        </p>

        {answer.answer}
        <div className="d-flex">
          {context.role === "user" &&
            answer.user._id === localStorage.getItem("id") && (
              <div className="d-flex">
                <ChangeAnswerModal className="mr-3" answ={answer} />

                <DeleteAnswerModal id={answer._id} />
              </div>
            )}
        </div>
      </ListGroupItem>
    </div>
  );
}
