const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();

shuffleChoices = (wrongOptions, rightOption) => {
  let choiceArray = wrongOptions.concat(rightOption);
  choiceArray = choiceArray.sort((a, b) => {
    return 0.5 - Math.random();
  });

  return choiceArray;
};

exports.newGame = functions.database
  .ref("/rooms/{gameid}")
  .onCreate((snapshot, context) => {
    console.log("msg from cloud");
    snapshot.ref.update({ msg: "cloud fn are fine" });
    return snapshot.ref.update({ option: "returnvalue" });
  });

exports.setGameData = functions.database
  .ref("/rooms/{gameid}/gameData/gamelib")
  .onCreate((snapshot, context) => {
    console.log("set game data", snapshot);
    console.log(snapshot.val(), context);
    snapshot.ref.parent.update({ msg: "setdata cloud func" });
    return snapshot.ref.parent.update({ option: snapshot.val() });
  });

exports.queChange = functions.database
  .ref("/rooms/{gameid}/gameData")
  .onWrite((change, context) => {
    console.log(change.after.val());
    let newvalue = change.after.val();
    let nextque = newvalue.gamelib.results[newvalue.currentQuestion].question;
    let wrongOptions =
      newvalue.gamelib.results[newvalue.currentQuestion].incorrect_answers;
    let rightOption =
      newvalue.gamelib.results[newvalue.currentQuestion].correct_answer;
    let choiceArray = shuffleChoices(wrongOptions, rightOption);
    console.log(nextque);
    return change.after.ref.parent.update({
      question: nextque,
      choicesArray: choiceArray,
      answer: rightOption
    });
  });

exports.gameEnd = functions.database
  .ref("/rooms/{gameid}/gameData/currentQuestion")
  .onUpdate((change, context) => {
    if (change.after.val() === 10) {
      return change.after.ref.parent.parent.update({
        gameStatus: "end"
      });
    } else return null;
  });
