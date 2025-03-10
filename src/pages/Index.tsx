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
import Layout from "@/components/ui/Layout";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call the backend to save/update the playlist data
  const savePlaylist = async (email: string, playlistUrl: string, name: string) => {
    const response = await fetch("https://api.brainrepo.es/save-playlist", { //http://localhost:8000/save-playlist
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

      // Now that we've saved the playlist, navigate to /start
      navigate("/start");
      alert("Playlist submitted successfully!");
      setPlaylistUrl("");
    } catch (error) {
      console.error("Error saving playlist:", error);
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
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient bg-[length:200%_200%]">
        {/* Header */}
        <header className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        {/* Logo on the left */}
        <div>
          <img 
            src="/logoindex2.png" 
            alt="My App Logo" 
            className="h-14 w-auto" 
          />
        </div>

        {/* Dropdown menu on the right */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 h-10 rounded-full bg-white/50 hover:bg-white/80 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.email}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => navigate("/plan")}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Plan</span>
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
        </div>
      </header>


        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="title">
              <strong>Stop Forgetting What You Watch</strong>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground font-heading leading-[1.4]">
              You consume tons of videos, but how much do you actually <strong>retain</strong>?
              <br />
              Get <strong>concise</strong>, <strong>insightful summaries</strong> of every video you want straight to your inbox.
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
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
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
                  placeholder="Enter your YouTube playlist URL to begin"
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
    </Layout>
  );
};

const steps = [
  {
    icon: Brain,
    title: "1. Create Your YouTube Playlist",
    description: "Make a YouTube playlist (public or hidden) and paste the URL.",
  },
  {
    icon: Mail,
    title: "2. Add Videos, We Take Notes",
    description: "Every new video you add is automatically summarized",
  },
  {
    icon: ArrowRight,
    title: "3. Get Key Insights & Takeaways",
    description: "Receive detailed, structured summaries in your inbox",
  },
];

export default Index;
