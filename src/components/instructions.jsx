import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./instructions.css";

const Instructions = () => {
  return (
    <>
      <Container>
        <div className="progCard ">
          <Row>
            <Col>
              <h3>How to Play</h3>
              <ul className="textAllignLeft">
                <li>
                  You should choose the correct answer from the four multiple
                  choices given.
                </li>
                <li>
                  For each Correct answer, you get 20 points and can advance to
                  next question by clicking on next button
                </li>{" "}
                <li>
                  Earn Maximum points by answering as many questions you can in
                  60 seconds..!! Make your moves fast !!
                </li>
              </ul>
              <div>
                <Link to="/">
                  <Button variant="danger">Home</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Instructions;
