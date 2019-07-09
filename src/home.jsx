import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Row, Button } from "react-bootstrap";
import logo from "./assets/triviaLogo.png";
import start from "./assets/Button-Play-icon.png";
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Container className="noPadding">
          <img src={logo} className="logo" />

          <div>
            <Link to="/game/">
              <Button variant="outline-light">
                <img src={start} className="start" />
                <span className="text"> START</span>
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
