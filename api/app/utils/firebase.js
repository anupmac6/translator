// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const Analytics= require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKdrK3rkRREjj5t6gPOJq6Dn9YHuqqfew",
  authDomain: "test-94be4.firebaseapp.com",
  projectId: "test-94be4",
  storageBucket: "test-94be4.appspot.com",
  messagingSenderId: "523733917349",
  appId: "1:523733917349:web:4524bf720309dd4079f74c",
  measurementId: "G-X56TBF0N0S",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = Analytics.getAnalytics(app);

module.exports = app
