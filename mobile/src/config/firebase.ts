import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB3cI0Xt9JACULWyjixUAtDYZcLFeDbr2U",
    authDomain: "translator-b7ca0.firebaseapp.com",
    projectId: "translator-b7ca0",
    storageBucket: "translator-b7ca0.appspot.com",
    messagingSenderId: "835164196733",
    appId: "1:835164196733:web:efa184bec9335617e04614",
    measurementId: "G-VMLXJ0VLW2"
  };

  const app = initializeApp(firebaseConfig);

  export default app;