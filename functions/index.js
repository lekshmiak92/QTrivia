const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();

exports.newGame = functions.database
  .ref("/rooms/{gameid}")
  .onCreate((snapshot, context) => {
    console.log("msg from cloud");
    snapshot.ref.update({ msg: "cloud fn are fine" });
    return snapshot.ref.update({ option: "returnvalue" });
  });

exports.setGameData = functions.database
  .ref("/rooms/{gameid}/gameData")
  .onCreate((snapshot, context) => {
    console.log("set game data");
    console.log(snapshot.val());
    snapshot.ref.parent.update({ msg: "setdata cloud func" });
    return snapshot.ref.parent.update({ option: snapshot.val() });
  });

exports.gameStart = functions.database
  .ref("/rooms/{gameid}/gameSatus")
  .onWrite((change, context) => {
    console.log(change.before.val(), change.after.val());
    return null;
  });
