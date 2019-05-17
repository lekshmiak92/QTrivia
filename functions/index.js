const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// getQuestions = () => {
//   let question,
//     answer = "";
//   let wrongAnswers = [];
//   var options;
//   fetch(
//     `https://opentdb.com/api.php?amount=1&category=10&difficulty=easy&type=multiple`
//   )
//     .then(res => {
//       res.json();
//       return null;
//     })
//     .catch(e => {
//       console.log("abc123" + e);
//     })
//     .then(apiData => {
//       question = apiData.results[0].question;
//       answer = apiData.results[0].correct_answer;
//       wrongAnswers = apiData.results[0].incorrect_answers;

//       options = shuffleChoices(wrongAnswers, answer);
//       return null;
//     })
//     .catch(e => {
//       console.log("def456" + e);
//     });
//   apiDataJson = {
//     que: question,
//     ans: answer,
//     choices: options
//   };
//   return apiDataJson;
// };

// shuffleChoices = () => {
//   let choiceArray = wrongAnswers.concat(answer);
//   choiceArray = choiceArray.sort((a, b) => {
//     return 0.5 - Math.random();
//   });

//   return choiceArray;
// };

// whattodo = () => {};
var data;

exports.newGame = functions.database
  .ref("/rooms/{gameid}")
  .onCreate((snapshot, context) => {
    console.log("msg from cloud");
    snapshot.ref.update({ msg: "cloud fn are fine" });
    // let apiDataJson = getQuestions();
    return snapshot.ref.update({ option: "returnvalue" });
  });

exports.gameStart = functions.database
  .ref("/rooms/{gameid}/gameStatus")
  .onCreate((snapshot, context) => {
    database
      .ref("/rooms/{gameid}/gameData/results")
      .once("value", function(snapshot) {
        data = snapshot.val();
      });
    return database.ref("/rooms/{gameid}/fromcloud").set(data);
  });
