// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // import auth module

const firebaseConfig = {
  apiKey: "AIzaSyCxO-w7OEdGDdVU1cAr0Lf9EXRxlxqeSQA",
  authDomain: "chainworkauth.firebaseapp.com",
  projectId: "chainworkauth",
  storageBucket: "chainworkauth.firebasestorage.app",
  messagingSenderId: "849936754154",
  appId: "1:849936754154:web:386e37fc13391e0dc77e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the Firebase Auth instance for use in signup/login
export const auth = getAuth(app);
