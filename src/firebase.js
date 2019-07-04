// import firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwtQofl2d8GoBm6TU67q1ImaLqWH7Tevc",
  authDomain: "qtrivia-1ebab.firebaseapp.com",
  databaseURL: "https://qtrivia-1ebab.firebaseio.com",
  projectId: "qtrivia-1ebab",
  storageBucket: "qtrivia-1ebab.appspot.com",
  messagingSenderId: "13126744922",
  appId: "1:13126744922:web:993d64f1600b169c"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const database = firebase.database();
export const firebaseAuth = firebase.auth();
