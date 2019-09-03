import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDzPLeVoZ1s8LT_AHogQJY89vyQgdWiRWE",
  authDomain: "vue-shop-2addd.firebaseapp.com",
  databaseURL: "https://vue-shop-2addd.firebaseio.com",
  projectId: "vue-shop-2addd",
  storageBucket: "vue-shop-2addd.appspot.com",
  messagingSenderId: "601528945171",
  appId: "1:601528945171:web:7f2acecb07464323"
};

const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export { fb, db }