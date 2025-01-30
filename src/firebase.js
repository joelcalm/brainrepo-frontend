// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7-QWEfiHN6dwIkwlVINy-bMCOwWyj8ss",
  authDomain: "autoyoutbe.firebaseapp.com",
  projectId: "autoyoutbe",
  storageBucket: "autoyoutbe.firebasestorage.app",
  messagingSenderId: "732124084577",
  appId: "1:732124084577:web:dffad3f20734b8c291ed20",
  measurementId: "G-V4ZVTDYWES"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);