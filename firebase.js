import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm2pnt9aDEufYqKAyMiUdUJFjsbQ5MHJA",
  authDomain: "appliqdis.firebaseapp.com",
  projectId: "appliqdis",
  databaseURL: "https://appliqdis-default-rtdb.firebaseio.com/",
  storageBucket: "appliqdis.appspot.com",
  messagingSenderId: "467025472081",
  appId: "1:467025472081:web:dfb19fe36e1af8c5cfa670",
  measurementId: "G-LCSQ0E7QXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
