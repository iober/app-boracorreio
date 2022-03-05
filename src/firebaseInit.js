// Import the functions you need from the SDKs you need

import firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCXhNvooWyug6ErVMGRpkG0aW9TIlbmRRg",
  authDomain: "boracorreio.firebaseapp.com",
  databaseURL: "https://boracorreio-default-rtdb.firebaseio.com",
  projectId: "boracorreio",
  storageBucket: "boracorreio.appspot.com",
  messagingSenderId: "201260435694",
  appId: "1:201260435694:web:fcf355b20e4cfeb8070bff",
};

export default firebase.initializeApp(firebaseConfig);

window.firebase = firebase;
