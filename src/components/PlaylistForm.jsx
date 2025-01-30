// src/components/PlaylistForm.jsx
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const PlaylistForm = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");

  const handleSavePlaylist = async () => {
    try {
      if (!auth.currentUser) {
        alert("Please sign in first.");
        return;
      }
      const userId = auth.currentUser.uid;

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        playlistUrl: playlistUrl
      });
      alert("Playlist URL saved to your user profile!");
      setPlaylistUrl("");
    } catch (error) {
      console.error("Error saving playlist URL:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Set Your YouTube Playlist</h2>
      <input
        type="text"
        placeholder="https://www.youtube.com/playlist?list=..."
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        style={{ width: "300px" }}
      />
      <button onClick={handleSavePlaylist}>Save</button>
    </div>
  );
};

export default PlaylistForm;
