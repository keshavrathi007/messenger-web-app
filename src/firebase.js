import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBZbt0TR796CFjgxDfNQ8zLtmgDV6Lfb48",
    authDomain: "messenger-clone-2c3ba.firebaseapp.com",
    projectId: "messenger-clone-2c3ba",
    storageBucket: "messenger-clone-2c3ba.appspot.com",
    messagingSenderId: "900035534621",
    appId: "1:900035534621:web:1cd1811372c580dc294bf4"
});

const db = firebaseApp.firestore();
export default db;