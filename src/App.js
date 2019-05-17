import React, { Component } from "react";
import { database } from "./firebase";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Question from "./components/question";
import AnswerChoice from "./components/answerChoice";
import NextButton from "./components/nextButton";
import GameStatistics from "./components/gameStatistics";

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
      currentQuestion: 0,
      userName: "",
      totalPoints: 0,
      userLevel: "",
      gameID: document.location.pathname
        ? document.location.pathname.slice(1, 8) === "QTrivia"
          ? id
          : "no_game_id"
        : "no_location_pathname",
      userId: "",
      isInitialiser: false
    };
  }

  componentDidMount() {
    // this.getQuestions();
    // this.fetchGameData();
    this.getUserId();
    console.log(this.state.isInitialiser);

    // database
    //   .ref(`rooms/${this.state.gameID}/gameData`)
    //   .update({ json: "dummydata" });
  }

  getQuestions = () => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple`
    )
      .then(res => res.json())
      .then(apiData => {
        this.setState({
          question: apiData.results[0].question,
          answer: apiData.results[0].correct_answer,
          wrongAnswers: apiData.results[0].incorrect_answers,
          clickStatus: "off",
          choseCorrectAnswer: false,
          currentQuestion: this.state.currentQuestion + 1
        });
        database.ref(`rooms/${this.state.gameID}/gameData`).set(apiData);
        database.ref(`rooms/${this.state.gameID}`).update({
          gameStatus: "start",
          currentQuestion: 0
        });

        this.shuffleChoices();
      });
  };

  shuffleChoices = () => {
    let choiceArray = this.state.wrongAnswers.concat(this.state.answer);
    choiceArray = choiceArray.sort((a, b) => {
      return 0.5 - Math.random();
    });

    this.setState({
      choicesArray: choiceArray
    });

    database.ref(`rooms/${this.state.gameID}/choiceOptions`).set(choiceArray);
  };

  getUserId = () => {
    console.log("getUser Id functions");
    if (!this.state.userId) {
      console.log("[App.js] getUserId()");
      let token, userId, userName;
      let playerList = {
        id: [0, 0],
        name: ["", ""]
      };

      try {
        token = window.QTalkApp.getUserAuthToken();
        //database.ref('token').set(token ? token : "no token");
      } catch {
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
            userId = data.userId ? data.userId : 1;
            userName = "mario";
          })
          .catch(e => {
            console.log(e);
          });
        this.setState({
          userId: userId,
          userName: userName
        });
      }

      database
        .ref(`rooms/${this.state.gameId}/players`)
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
                playerList.id[zeroIndex] = userId ? userId : 0;
                playerList.name[zeroIndex] = userName ? userName : "";
              } else {
                if (playerList.id.length === 0) {
                  console.log("hoy");
                  this.setState({ isInitialiser: true });

                  database
                    .ref(`rooms/${this.state.gameID}/initialiser`)
                    .set(userId);

                  this.getQuestions();
                }
                playerList.id.push(userId ? userId : 0);
                playerList.name.push(userName ? userName : "");
              }
            } catch (error) {
              console.log(error);
            }

            this.setState({
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

  // handleClickOfNext = () => {
  //   this.getQuestions();
  // };

  // storeGameData = () => {
  //   let userData = {
  //     name: this.state.userName,
  //     points: this.state.points + this.state.totalPoints
  //   };

  //   window.localStorage.setItem("trivia", JSON.stringify(userData));
  // };

  // fetchGameData = () => {
  //   const gameData = JSON.parse(window.localStorage.getItem("trivia"));
  //   if (gameData) {
  //     this.setState({
  //       userName: gameData.name,
  //       totalPoints: gameData.points
  //     });
  //   }
  // };

  render() {
    return (
      <div className="App">
        <Container>
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
              // setLocalStorage={this.storeGameData}
            />
          ))}

          <NextButton
            text="Next"
            clickStatus={this.state.clickStatus}
            onClickOfNext={this.handleClickOfNext}
            choseCorrectAnswer={this.state.choseCorrectAnswer}
          />
        </Container>
      </div>
    );
  }
}

export default App;
