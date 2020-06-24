import * as firebase from "firebase"

const settings = {
  timestampsInSnapshots: true
}

var firebaseConfig = {
  apiKey: "AIzaSyAhrKjVsj2eQiXUksrp4RHDaOmnk2pi2l0",
  authDomain: "gifts-list-c6527.firebaseapp.com",
  databaseURL: "https://gifts-list-c6527.firebaseio.com",
  projectId: "gifts-list-c6527",
  storageBucket: "gifts-list-c6527.appspot.com",
  messagingSenderId: "238820385415",
  appId: "1:238820385415:web:91973620cebfea48244e22"
};
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings(settings)

export default firebase;
