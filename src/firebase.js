import firebase from 'firebase/app';
import 'firebase/firestore';


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBpIaq6i08RtGtHOZBeLa41qVKd0Aw8FCo",
  authDomain: "itil-support.firebaseapp.com",
  databaseURL: "https://itil-support.firebaseio.com",
  projectId: "itil-support",
  storageBucket: "itil-support.appspot.com",
  messagingSenderId: "303455251893",
  appId: "1:303455251893:web:0fe1e5fb755c46633fbdfc",
  measurementId: "G-KBHP4HSYBF"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();