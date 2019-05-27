import React, { Component } from "react";
import { database } from "./firebase";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Question from "./components/question";
import AnswerChoice from "./components/answerChoice";
import NextButton from "./components/nextButton";
import GameStatistics from "./components/gameStatistics";
import Timer from "./components/timer";

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
      isInitialiser: false,
      gameTime: 30
    };
  }

  componentDidMount() {
    this.getUserId();
    database
      .ref(`rooms/${this.state.gameID}/gameStatus`)
      .on("value", snapshot => {
        console.log(snapshot.val());
        if (snapshot.val() === "start" && this.state.isInitialiser === true) {
          try {
            if (window.QTalkApp) {
              window.QTalkApp.notifyGameRoundStarted();
            }
          } catch {
            console.log("Present Game started");
          }
        } else if (
          snapshot.val() === "end" &&
          this.state.isInitialiser === true
        ) {
          try {
            if (window.QTalkApp) {
              window.QTalkApp.notifyGameRoundEnded();
            }
          } catch {
            console.log("Present Game ended");
          }
        }
      });
    console.log(this.state.isInitialiser);
  }

  getQuestions = () => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple`
    )
      .then(res => res.json())
      .then(apiData => {
        // this.setState({
        //   question: apiData.results[0].question,
        //   answer: apiData.results[0].correct_answer,
        //   wrongAnswers: apiData.results[0].incorrect_answers,
        //   clickStatus: "off",
        //   choseCorrectAnswer: false,
        //   currentQuestion: this.state.currentQuestion + 1
        // });

        // let options = this.shuffleChoices(
        //   apiData.results[0].incorrect_answers,
        //   apiData.results[0].correct_answer
        // );

        // database.ref(`rooms/${this.state.gameID}/gameData`).set(apiData);
        database.ref(`rooms/${this.state.gameID}`).update({
          gameData: { currentQuestion: 0, gamelib: apiData },
          gameStatus: "start"
          // currentQuestion: 0,
          // question: apiData.results[0].question,
          // answer: apiData.results[0].correct_answer,
          // choicesArray: options
        });
      });
  };

  // shuffleChoices = (wrongOptions, rightOption) => {
  //   let choiceArray = wrongOptions.concat(rightOption);
  //   choiceArray = choiceArray.sort((a, b) => {
  //     return 0.5 - Math.random();
  //   });

  //   // this.setState({
  //   //   choicesArray: choiceArray
  //   // });

  //   // database.ref(`rooms/${this.state.gameID}/choiceOptions`).set(choiceArray);
  //   return choiceArray;
  // };

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
            userId = data.userId ? "nulluserid" : 1;
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
                playerList.id[zeroIndex] = userId ? userId : 0;
                playerList.name[zeroIndex] = userName ? userName : "";
              } else {
                if (playerList.id.length === 0) {
                  console.log("hoy");
                  this.setState({ isInitialiser: true });

                  database
                    .ref(`rooms/${this.state.gameID}/initialiser`)
                    .set(userId ? userId : 999);

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
    this.getState();
  };

  getState = () => {
    let que,
      ans = "";
    let multipleOptions = [];
    console.log("inside getstate");

    database.ref(`rooms/${this.state.gameID}`).on("value", snapshot => {
      console.log(snapshot.val());
      if (snapshot && snapshot.val()) {
        que = snapshot.val().question ? snapshot.val().question : "no que";
        multipleOptions = snapshot.val().choicesArray
          ? snapshot.val().choicesArray
          : [];
        ans = snapshot.val().answer ? snapshot.val().answer : "no ans";

        this.setState({
          question: que,
          answer: ans,
          choicesArray: multipleOptions
        });
      }
    });

    database
      .ref(`rooms/${this.state.gameID}/gameData/currentQuestion`)
      .on("value", snapshot => {
        console.log(snapshot.val());
        this.setState({
          chosenAnswer: "",
          clickStatus: "off",
          choseCorrectAnswer: false,
          currentQuestion: snapshot.val()
        });
      });
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
    if (this.state.isInitialiser) {
      database
        .ref(`rooms/${this.state.gameID}/gameData/currentQuestion`)
        .transaction(snapshot => {
          console.log("inside click-next" + snapshot);
          if (snapshot === 9) {
            // 10 questions ---> counts from 0 to 9
            return snapshot;
          } else return snapshot + 1;
        });
    }
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Timer
            startTimeInSeconds={this.state.gameTime}
            nextRound={this.handleClickOfNext}
          />
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
        </Container>
      </div>
    );
  }
}

export default App;
