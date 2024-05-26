// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "yol-arkadasim-2b91f.firebaseapp.com",
  projectId: "yol-arkadasim-2b91f",
  storageBucket: "yol-arkadasim-2b91f.appspot.com",
  messagingSenderId: "579637513643",
  appId: "1:579637513643:web:bb1e7df361177a83e2d6ee",
  measurementId: "G-9D64J52E55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);