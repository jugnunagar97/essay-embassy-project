import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQJfrcq5BpNzLIJhMhtG_B_a14-02wdA",
  authDomain: "essay-embassy.firebaseapp.com",
  projectId: "essay-embassy",
  storageBucket: "essay-embassy.appspot.com",
  messagingSenderId: "820260296463",
  appId: "1:820260296463:web:23cb3bb43ecfc2fc0ed07a",
  measurementId: "G-RYB8SKPJD2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);