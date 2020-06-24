import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import firebase from "firebase";
// import firebaseConfig from "./firebaseConfig";

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const settings = {
//   timestampsInSnapshots: true,
// };
// firestore.settings(settings);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
