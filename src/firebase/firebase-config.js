import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAHBuyuajA-XRMfz3rSVjwT30h1JXFj63A',
  authDomain: 'react-curso-fh-9f212.firebaseapp.com',
  projectId: 'react-curso-fh-9f212',
  storageBucket: 'react-curso-fh-9f212.appspot.com',
  messagingSenderId: '996264269425',
  appId: '1:996264269425:web:72544c4b5fa0348a8a2dd0',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
