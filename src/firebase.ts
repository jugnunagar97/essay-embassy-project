// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyCQJfrcq5BpNzLJIbN1htG_B_a14-02wdA",
  authDomain: "essay-embassy.firebaseapp.com",
  projectId: "essay-embassy",
  storageBucket: "essay-embassy.firebasestorage.app",
  messagingSenderId: "820260296463",
  appId: "1:820260296463:web:23cb3bb43ecfc2fc0ed07a",
  measurementId: "G-RYB8SKPJD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };