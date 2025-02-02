// src/App.js
import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import SetPlaylist from "./components/SetPlaylist";

function App() {
  const [userEmail, setUserEmail] = useState("");

  const handleAuthSuccess = (email) => {
    setUserEmail(email);
  };

  return (
    <div>
      {!userEmail ? (
        // If user is not logged in, show the login/register component
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        // Otherwise, show the playlist setter
        <SetPlaylist userEmail={userEmail} />
      )}
    </div>
  );
}

export default App;
