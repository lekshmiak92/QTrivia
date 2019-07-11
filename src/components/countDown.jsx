import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      this.props.onFinish();
    }
  }
  render() {
    return (
      <div>
        <ProgressBar
          animated
          now={this.state.seconds * (5 / 3)}
          label={`${this.state.seconds}sec`}
        />
      </div>
    );
  }
}
export default CountDown;
