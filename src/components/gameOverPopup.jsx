import React, { Component } from "react";
import { database } from "../firebase";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

class GameOverPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      pointsTable: {}
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };

  handleNew = () => {
    this.handleClose();
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 2000);
    database
      .ref(`rooms/${this.state.gameID}/playerPoints`)
      .on("value", snapshot => {
        this.setState({ pointsTable: snapshot.val() });
      });
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} centered>
          <Modal.Header>
            <Modal.Title>Game Over</Modal.Title>
          </Modal.Header>
          <Modal.Body>Time up !!! fetching results...</Modal.Body>
          <Modal.Footer>
            {/* <Link to="/"> */}
            <Button variant="secondary" onClick={this.handleNew}>
              Home
            </Button>
            {/* </Link> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default GameOverPopup;
