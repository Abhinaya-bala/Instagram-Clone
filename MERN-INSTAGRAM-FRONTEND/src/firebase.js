import firebase from "firebase";

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
//   authDomain: "instagram-clone-23884.firebaseapp.com",
//   databaseURL: "https://instagram-clone-23884.firebaseio.com",
//   projectId: "instagram-clone-23884",
//   storageBucket: "instagram-clone-23884.appspot.com",
//   messagingSenderId: "671034896143",
//   appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
// });

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDlN3iJDkmSE2DU6JiAdL_D_BA8OnAXdXo",
  authDomain: "instagramclone-4ec54.firebaseapp.com",
  databaseURL: "https://instagramclone-4ec54.firebaseio.com",
  projectId: "instagramclone-4ec54",
  storageBucket: "instagramclone-4ec54.appspot.com",
  messagingSenderId: "775658439939",
  appId: "1:775658439939:web:68c65953ce5b666cd25536",
  measurementId: "G-GV89798G0Y"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export { db, auth, storage };


