/* eslint-disable no-undef */
firebase.initializeApp({
  apiKey: "AIzaSyCXhNvooWyug6ErVMGRpkG0aW9TIlbmRRg",
  authDomain: "boracorreio.firebaseapp.com",
  databaseURL: "https://boracorreio-default-rtdb.firebaseio.com",
  projectId: "boracorreio",
  storageBucket: "boracorreio.appspot.com",
  messagingSenderId: "201260435694",
  appId: "1:201260435694:web:fcf355b20e4cfeb8070bff",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
