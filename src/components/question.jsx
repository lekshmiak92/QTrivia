import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

const Question = props => {
  return (
    <Col>
      <Card className="quesCard">
        <Card.Body>
          <pre>{props.ques}</pre>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Question;
