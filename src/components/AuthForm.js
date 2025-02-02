// src/components/AuthForm.js
import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "../firebaseConfig";  // Make sure this file initializes Firebase

function AuthForm({ onAuthSuccess }) {
  const [tab, setTab] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // The user's email can be retrieved from result.user
      const userEmail = result.user.email;
      if (onAuthSuccess) onAuthSuccess(userEmail);
    } catch (error) {
      console.error("Google sign-in failed", error);
      alert("Google sign-in failed. Check console for details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tab === "login") {
        // Login user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (onAuthSuccess) onAuthSuccess(userCredential.user.email);
      } else {
        // Register user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (onAuthSuccess) onAuthSuccess(userCredential.user.email);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.message || "Authentication failed");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setTab("login")} style={{ borderBottom: tab === "login" ? "2px solid blue" : "none" }}>
          Login
        </button>
        <button onClick={() => setTab("register")} style={{ borderBottom: tab === "register" ? "2px solid blue" : "none" }}>
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <button type="submit">{tab === "login" ? "Login" : "Register"}</button>
      </form>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <hr />
        OR
        <br />
        <button onClick={handleGoogleSignIn} style={{ marginTop: 10 }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
