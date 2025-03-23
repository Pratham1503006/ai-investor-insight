import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbEZW3EQxpT13ebwU9X8ZkxILlBFr4d-U",
  authDomain: "firstapp-dfe48.firebaseapp.com",
  databaseURL: "https://firstapp-dfe48-default-rtdb.firebaseio.com/",
  projectId: "firstapp-dfe48",
  storageBucket: "firstapp-dfe48.appspot.com",
  messagingSenderId: "308682158198",
  appId: "1:308682158198:web:4abb3905d5962b2072af57"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };