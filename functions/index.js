const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();

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
    functions.database
      .ref("/rooms/{gameid}/gameData/results")
      .once("value", function(snapshot) {
        data = snapshot.val();
      });
    return database.ref("/rooms/{gameid}/fromcloud").set(data);
  });
