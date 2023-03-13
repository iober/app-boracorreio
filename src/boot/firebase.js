// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXhNvooWyug6ErVMGRpkG0aW9TIlbmRRg",
  authDomain: "boracorreio.firebaseapp.com",
  databaseURL: "https://boracorreio-default-rtdb.firebaseio.com",
  projectId: "boracorreio",
  storageBucket: "boracorreio.appspot.com",
  messagingSenderId: "201260435694",
  appId: "1:201260435694:web:fcf355b20e4cfeb8070bff",
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

firebaseAuth.useDeviceLanguage();

export { firebase, firebaseAuth, firebaseDb };
