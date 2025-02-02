// src/components/SetPlaylist.js
import React, { useState } from "react";

function SetPlaylist({ userEmail }) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSetPlaylist = async () => {
    setMessage("Processing...");
    try {
      const response = await fetch("http://localhost:8000/set-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          playlistUrl: playlistUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message + " | newVideosFound: " + data.newVideosFound);
    } catch (error) {
      console.error("Error setting playlist:", error);
      setMessage("Failed to set playlist. Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <input
        type="text"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        placeholder="Enter YouTube Playlist URL"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleSetPlaylist} disabled={!userEmail || !playlistUrl}>
        Set Playlist & Process
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SetPlaylist;
