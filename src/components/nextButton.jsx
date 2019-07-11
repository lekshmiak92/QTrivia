import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "../App.css";

const NextButton = props => {
  let disabledProp;
  if (props.clickStatus === "on") {
    disabledProp = false;
  } else {
    disabledProp = true;
  }

  return (
    <Row className="navWrap" style={{ padding: "0% 10%" }}>
      <Button
        variant="primary"
        onClick={props.onClickOfNext}
        disabled={disabledProp}
      >
        {props.text}
      </Button>
    </Row>
  );
};

export default NextButton;
