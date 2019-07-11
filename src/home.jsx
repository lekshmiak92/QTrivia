import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Image } from "react-bootstrap";
import logo from "./assets/triviaLogo.png";
import start from "./assets/Button-Play-icon.png";
import howToPlay from "./assets/qmark.jpeg";
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Container className="pad1">
          <Image src={logo} fluid />
          <ul>
            <li className="hometabs">
              <Link to="/game/">
                <Image src={start} fluid className="start" />
                <span className="text"> Start</span>
              </Link>
            </li>
            <li className="hometabs">
              <Link to="/howToPlay/">
                <Image src={howToPlay} fluid className="start" />
                <span className="text"> How to Play</span>
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    );
  }
}

export default Home;
