import React, { Component } from "react";
import { database } from "./firebase";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Question from "./components/question";
import AnswerChoice from "./components/answerChoice";
import NextButton from "./components/nextButton";
import GameStatistics from "./components/gameStatistics";
import GameOverPopup from "./components/gameOverPopup";
// import Timer from "./components/timer";
import CountDown from "./components/countDown";
import entities from "entities";

function getAllUrlParams(url) {
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split("#")[0];
    var arr = queryString.split("&");
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split("=");
      var paramName = a[0];
      var paramValue = typeof a[1] === "undefined" ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, "");
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

let parameters = getAllUrlParams(window.location.href);
let id = parameters.id ? parameters.id : "";
let isDebug =
  parameters.isdebug === true ? true : parameters.isdebug === "true";
let isTestUser =
  parameters.istestuser === true ? true : parameters.istestuser === "true";

console.log(parameters);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "Loading...",
      answer: "",
      wrongAnswers: [],
      choicesArray: [],
      chosenAnswer: "",
      clickStatus: "off",
      choseCorrectAnswer: false,
      points: 0,
      currentQuestion: 1,
      userName: "ddd",
      totalPoints: 0,
      userLevel: "",
      gameID: document.location.pathname
        ? document.location.pathname.slice(1, 8) === "QTrivia"
          ? id
          : "no_game_id"
        : "no_location_pathname",
      userId: "",
      isInitialiser: false,
      gameTime: 30,
      gameLib: {},
      gameBegin: "",
      gameEnd: null,
      pointsTable: {}
    };
  }

  componentDidMount() {
    this.getUserId();
    database
      .ref(`rooms/${this.state.gameID}/gameStatus`)
      .on("value", snapshot => {
        console.log(snapshot.val());
        if (snapshot.val() === "start") {
          try {
            if (window.QTalkApp) {
              window.QTalkApp.notifyGameRoundStarted();
            }
          } catch (e) {
            console.log("Present Game started");
          }
        } else if (snapshot.val() === "end") {
          try {
            if (window.QTalkApp) {
              window.QTalkApp.notifyGameRoundEnded();
            }
          } catch (e) {
            console.log("Present Game ended");
          }
        }
      });
    database
      .ref(`rooms/${this.state.gameID}/playerPoints/`)
      .on("value", snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val());
          console.log(Object.entries(snapshot.val()));
          let abc = Object.entries(snapshot.val());
          this.setState({ pointsTable: abc });
        }
      });
  }

  getUserId = () => {
    console.log("getUser Id functions", this.state.gameID);

    if (!this.state.userId) {
      console.log("[App.js] getUserId()");
      let token, userId, userName;
      let playerList = {
        id: [0, 0],
        name: ["", ""]
      };

      try {
        token = window.QTalkApp.getUserAuthToken();
      } catch (e) {
        // token = "";
        token = "cdc9b8e03a9e85e02a425983028b602ecdd7bdd5";
      }

      let url = isDebug
        ? "https://staging.remote.qtalk.io/v1/verifyAuthIdToken"
        : "https://remote.qtalk.io/v1/verifyAuthIdToken";

      if (isTestUser) {
        url = url + "?isTestUser=true";
      }

      console.log(url);

      if (token) {
        fetch(url, {
          method: "GET",
          headers: {
            "X-Auth-Id-Token": token ? token : ""
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data.userId);
            userId = data.userId;
            userName = data.userDetails.displayName;
          })
          .catch(e => {
            console.log(e);
          });
        this.setState({
          userId: userId ? userId : "newid",
          userName: userName ? userName : "newname"
        });
      }

      database
        .ref(`rooms/${this.state.gameID}/players`)
        .once("value", snapshot => {
          if (snapshot) {
            console.log(snapshot);
            console.log(snapshot.val());

            playerList = snapshot.val();

            if (!playerList) {
              playerList = {
                id: [],
                name: []
              };
            }

            try {
              let zeroIndex = playerList.id.indexOf(0);
              console.log(playerList.id);
              console.log(playerList);
              if (zeroIndex !== -1) {
                playerList.id[zeroIndex] = userId ? userId : "testid";
                playerList.name[zeroIndex] = userName ? userName : "testUser";
              } else {
                if (playerList.id.length === 0) {
                  console.log("hoy");
                  this.setState({ isInitialiser: true });
                  this.getQuestions();
                  database.ref(`rooms/${this.state.gameID}/`).update({
                    initialiser: userId ? userId : 999,
                    playerPoints: ""
                  });
                } else {
                  database
                    .ref(`rooms/${this.state.gameID}/gamelib`)
                    .once("value", snapshot => {
                      let array = snapshot.val().results;
                      this.setState({ gameLib: array, gameBegin: "true" });
                    });
                }
                playerList.id.push(userId ? userId : "testid");
                playerList.name.push(userName ? userName : "testUser");
              }
            } catch (error) {
              console.log(error);
            }

            this.setState({
              userName: userName,
              playerList: playerList,
              loading: false
            });

            console.log(playerList);
            database.ref(`rooms/${this.state.gameID}/players`).set(playerList);
          }
        });
      console.log("token", token);
    }
  };

  getQuestions = () => {
    console.log(this.state.isInitialiser, "dhe ithu varunnundo entho");
    fetch(`https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple`)
      .then(res => res.json())
      .then(apiData => {
        database.ref(`rooms/${this.state.gameID}`).update({
          gamelib: apiData,
          gameStatus: "start"
        });
        this.setState({ gameLib: apiData.results, gameBegin: "true" });
      });
  };

  getState = () => {
    console.log("inside getstate");
    console.log(this.state.gameLib);

    let i = this.state.currentQuestion - 1;
    let list = this.state.gameLib[i];
    console.log(i);
    let wrongchoices = list.incorrect_answers;
    let rightchoice = list.correct_answer;
    let multipleOptions = this.shuffleChoices(wrongchoices, rightchoice);
    let que = entities.decodeHTML(list.question);
    this.setState({
      question: que,
      answer: list.correct_answer,
      choicesArray: multipleOptions
    });
  };

  shuffleChoices = (wrongOptions, rightOption) => {
    let choiceArray = wrongOptions.concat(rightOption);
    choiceArray = choiceArray.sort((a, b) => {
      return 0.5 - Math.random();
    });

    return choiceArray;
  };

  handleOptionClick = e => {
    let chosenOption = e.target.textContent;

    if (chosenOption === this.state.answer) {
      this.setState({
        clickStatus: "on",
        choseCorrectAnswer: true,
        chosenAnswer: chosenOption,
        points: this.state.points + 20
      });
    } else {
      this.setState({
        clickStatus: "on",
        choseCorrectAnswer: false,
        chosenAnswer: chosenOption
      });
    }
  };

  handleClickOfNext = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      chosenAnswer: "",
      clickStatus: "off",
      choseCorrectAnswer: false
    });
    this.getState();
  };

  resetGameBegin = () => {
    this.setState({ gameBegin: "false" });
  };

  setGameEnd = () => {
    this.setState({ gameEnd: true });

    let name = this.state.userName
      ? this.state.userName
      : Math.random()
          .toString(36)
          .substring(7);
    database
      .ref(`rooms/${this.state.gameID}/playerPoints/${name}`)
      .set(this.state.points);
  };

  render() {
    let stat = this.state.gameBegin;
    let gameEnd = this.state.gameEnd;
    let popup;
    if (stat === "true" && this.state.gameLib !== null) {
      this.getState();
      this.resetGameBegin();
    }
    if (gameEnd) {
      popup = <GameOverPopup points={this.state.pointsTable} />;
    } else {
      popup = "";
    }
    return (
      <div className="App">
        <Container className="noPadding">
          <CountDown seconds={60} onFinish={this.setGameEnd} />
          <GameStatistics
            gamePoints={this.state.points}
            currentQuestion={this.state.currentQuestion}
          />
          <Row>
            <Question ques={this.state.question} />
          </Row>
          {this.state.choicesArray.map((element, index) => (
            <AnswerChoice
              key={index}
              answerOption={element}
              handleClick={this.handleOptionClick}
              chosenAnswer={this.state.chosenAnswer}
              revealresult={this.state.choseCorrectAnswer}
              clickStatus={this.state.clickStatus}
              correctAnswer={this.state.answer}
              prophistory={this.props.history}
              points={this.state.points}
            />
          ))}

          <NextButton
            text="Next"
            clickStatus={this.state.clickStatus}
            onClickOfNext={this.handleClickOfNext}
            choseCorrectAnswer={this.state.choseCorrectAnswer}
          />
          {popup}
        </Container>
      </div>
    );
  }
}

export default App;
