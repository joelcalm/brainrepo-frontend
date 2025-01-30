// src/components/login.jsx

import React from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User info:", user);

      // Build a reference to `users/{uid}`
      const userDocRef = doc(db, "users", user.uid);

      // Use setDoc to write user data
      await setDoc(
        userDocRef,
        {
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          // Add any other fields you want here
        },
        { merge: true }
      );

      alert(`Welcome, ${user.displayName}! Your info has been saved.`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Google Sign In Test</h1>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
