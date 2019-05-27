import React, { Component } from "react";
import "../App.css";

let timer = null;
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: props.startTimeInSeconds
    };
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
    } else {
      clearInterval(!timer);
      this.resetGameTime();
      this.props.nextRound();
    }
  };

  componentDidMount() {
    timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  resetGameTime = () => {
    this.setState({
      timeRemainingInSeconds: this.props.startTimeInSeconds
    });
    // this.props.nextRound();
  };

  render() {
    return (
      <div className="countdown-timer">
        <div id="timerWrap" className="countdown-timer__circle">
          <svg>
            <circle
              r="24"
              cx="26"
              cy="26"
              style={{
                animation: `countdown-animation ${
                  this.props.startTimeInSeconds
                }s linear 1s infinite`
              }}
            />
          </svg>
        </div>
        <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds}s
        </div>
      </div>
    );
  }
}

export default Timer;
