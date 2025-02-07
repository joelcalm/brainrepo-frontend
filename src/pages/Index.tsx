// src/pages/Index.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Mail, User, LogOut, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { firebaseAuth } from "@/integrations/firebase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call the backend to save/update the playlist data
  const savePlaylist = async (email: string, playlistUrl: string, name: string) => {
    const response = await fetch("http://localhost:8000/save-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, playlistUrl, name }),
    });
    if (!response.ok) {
      throw new Error(`Failed to save playlist. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Playlist saved, userId:", data.userId);
  };

  const handlePlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If the user is not logged in, redirect them to the sign-up page with the URL passed in state.
    if (!user) {
      navigate("/signup2", { state: { playlistUrl } });
      return;
    }

    setLoading(true);
    try {
      // Use the logged-in user's email and name (fallback to "Anonymous" if no displayName)
      const userEmail = user.email;
      const userName = user.displayName || "Anonymous";

      // Save/update the playlist info in Firestore via the backend
      await savePlaylist(userEmail, playlistUrl, userName);

      navigate("/success");
      
      // Immediately trigger processing by calling the /run-cron endpoint
      const processResponse = await fetch("http://localhost:8000/run-cron");
      const processResult = await processResponse.json();
      console.log("Process All Result:", processResult);

      alert("Playlist submitted and processed successfully!");
      setPlaylistUrl("");
      
    } catch (error) {
      console.error("Error adding playlist:", error);
      alert("There was an error submitting your playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-end items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user.email}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => navigate("/upgrade")}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium hover:text-primary">
              Log in
            </Link>
            <Link to="/signup" className="button-primary text-sm">
              Sign up
            </Link>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get Video Summaries Straight to Your Inbox
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Transform your YouTube playlists into concise, actionable summaries
          </p>

          {/* Steps */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Playlist Input Form */}
          <form onSubmit={handlePlaylistSubmit} className="mt-12">
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="url"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="Paste your YouTube playlist URL here"
                className="input-field flex-1"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="button-primary whitespace-nowrap"
              >
                {loading ? "Processing..." : "Get Summaries"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

const steps = [
  {
    icon: Brain,
    title: "1. Choose Your Playlist",
    description: "Paste the URL of any YouTube playlist you want to learn from",
  },
  {
    icon: Mail,
    title: "2. Get Summaries",
    description: "Receive email summaries for each video in your playlist",
  },
  {
    icon: ArrowRight,
    title: "3. Stay Updated",
    description: "Get automatic summaries when new videos are added",
  },
];

export default Index;