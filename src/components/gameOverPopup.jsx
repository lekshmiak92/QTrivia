import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./gameOverPopup.css";

class GameOverPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
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
  }

  render() {
    let array = this.props.points;

    return (
      <>
        <Modal show={this.state.show} centered>
          <Modal.Header>
            <Modal.Title>Time up ..!! </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Scoreboard</h4>
            {array.map((element, index) => (
              <p className="scorerow" key={index}>
                <span className="username">{element[0]}</span>
                <span className="userscore">{element[1]}</span>
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Link to="/">
              <Button variant="secondary" onClick={this.handleNew}>
                Home
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default GameOverPopup;
