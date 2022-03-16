// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXhNvooWyug6ErVMGRpkG0aW9TIlbmRRg",
  authDomain: "boracorreio.firebaseapp.com",
  projectId: "boracorreio",
  storageBucket: "boracorreio.appspot.com",
  messagingSenderId: "201260435694",
  appId: "1:201260435694:web:fcf355b20e4cfeb8070bff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
const firebaseDb = ref(getDatabase());
let firebaseAuth = firebaseApp.auth();
export { firebase, firebaseAuth, firebaseDb };
