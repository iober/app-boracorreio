// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
const firebaseDb = ref(getDatabase());
let firebaseAuth = firebaseApp.auth();
export { firebase, firebaseAuth, firebaseDb };
