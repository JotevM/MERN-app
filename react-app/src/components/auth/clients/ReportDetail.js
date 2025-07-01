import React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import ChangeReportModal from "./ChangeReportModal";
import DeleteReportModal from "./DeleteReportModal";

export default function ReportDetail({ report, forceUpdateComp }) {
  return (
    <Col sm="4" md="4">
      <Card body color="secondary" outline className="mt-4">
        <CardTitle>
          <p className="text-center">
            <strong>
            Date:{" "}
            </strong>
            <span className="font-weight-bold">
              {" "}
              {new Date(report.date).toLocaleDateString()}{" "}
            </span>{" "}
          </p>
        </CardTitle>
        <CardText>
          <strong>
          <div className="text-center mb-3">Description</div>
          </strong>
          {report.description}
        </CardText>
        <div className="d-flex justify-content-around">
          <ChangeReportModal report={report} forceUpdateComp={forceUpdateComp} />
          <DeleteReportModal repId={report._id} forceUpdateComp={forceUpdateComp} />
        </div>
      </Card>
    </Col>
  );
}
