// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdpVHCDB1oVHTb2q4PJ13pkvfDpG0h3Xk",
  authDomain: "quote-app-1a63e.firebaseapp.com",
  projectId: "quote-app-1a63e",
  storageBucket: "quote-app-1a63e.appspot.com",
  messagingSenderId: "381666659275",
  appId: "1:381666659275:web:1dd22cb1d7e7a3b223044e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app, db };
