import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtgrZKPnaAcjAyaaBbTHBF1P2-BUiMQiU",
    authDomain: "ripples-9932d.firebaseapp.com",
    databaseURL: "https://ripples-9932d.firebaseio.com",
    projectId: "ripples-9932d",
    storageBucket: "ripples-9932d.appspot.com",
    messagingSenderId: "452409543324",
    appId: "1:452409543324:web:ad7627aba7dd8e988b7b59",
    measurementId: "G-SP1XY9MY8J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;