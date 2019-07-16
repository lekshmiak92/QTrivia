import React, { Component } from "react";
import "../App.css";
import { Card, Col } from "react-bootstrap";

class AnswerChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isCorrectAnswer = () => {
    return (
      this.props.clickStatus === "on" &&
      this.props.chosenAnswer !== "" &&
      this.props.answerOption === this.props.correctAnswer
    );
  };

  isWrongAnswer = () => {
    return (
      this.props.clickStatus === "on" &&
      this.props.revealresult === false &&
      this.props.chosenAnswer === this.props.answerOption
    );
  };

  render() {
    if (this.isCorrectAnswer()) {
      return (
        <Col xs={12} sm={6} className="leftPull bottomPadding">
          <Card className="answerWrap bg-green ">
            <Card.Body className="noPadding">
              {this.props.answerOption}
            </Card.Body>
          </Card>
        </Col>
      );
    } else if (this.isWrongAnswer()) {
      return (
        <>
          <Col xs={12} sm={6} className="leftPull bottomPadding">
            <Card className="answerWrap bg-red ">
              <Card.Body className="noPadding">
                {this.props.answerOption}
              </Card.Body>
            </Card>
          </Col>
        </>
      );
    } else if (this.props.clickStatus === "on") {
      return (
        <Col xs={12} sm={6} className="leftPull bottomPadding">
          <Card className="answerWrap bg-lightBlue">
            <Card.Body className="noPadding">
              {this.props.answerOption}
            </Card.Body>
          </Card>
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6} className="leftPull bottomPadding">
          <Card
            className="answerWrap bg-lightBlue"
            onClick={this.props.handleClick}
          >
            <Card.Body className="noPadding">
              {this.props.answerOption}
            </Card.Body>
          </Card>
        </Col>
      );
    }
  }
}

export default AnswerChoice;
