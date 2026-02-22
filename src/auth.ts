// src/auth.ts

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Signup Function
export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login Function
export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Listen to auth state changes
export const onAuthStateChangedListener = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged(callback);
};

// Sign out function
export const logoutUser = () => {
  return auth.signOut();
};
