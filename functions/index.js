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
