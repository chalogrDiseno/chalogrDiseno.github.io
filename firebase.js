import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyDm2pnt9aDEufYqKAyMiUdUJFjsbQ5MHJA",
  authDomain: "appliqdis.firebaseapp.com",
  projectId: "appliqdis",
  storageBucket: "appliqdis.appspot.com",
  messagingSenderId: "467025472081",
  appId: "1:467025472081:web:dfb19fe36e1af8c5cfa670",
  measurementId: "G-LCSQ0E7QXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);