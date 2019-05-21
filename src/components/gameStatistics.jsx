import React from "react";
import { Row, Col } from "react-bootstrap";
import "../App.css";

const GameStatistics = props => {
  return (
    <Row className="statistics">
      <Col>
        Que.No: <span className="gamePoints">{props.currentQuestion + 1}</span>
      </Col>
      <Col>
        Points:<span className="gamePoints">{props.gamePoints}</span>
      </Col>
    </Row>
  );
};

export default GameStatistics;
