// src/pages/Login2.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "@/integrations/firebase/client";

const Login2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If the user first entered a playlist URL on the homepage,
  // it will be passed here via location.state
  const playlistUrl = location.state?.playlistUrl || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to call /save-playlist
  const savePlaylist = async (userEmail: string, url: string, userName: string) => {
    const response = await fetch("https://api.brainrepo.es/save-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        playlistUrl: url,
        name: userName,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to save playlist. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("save-playlist response:", data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sign in with email and password
      const userCred = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const currentUser = userCred.user;
      if (playlistUrl) {
        // If user entered a new playlist URL on the homepage, update it in Firestore
        const userName = currentUser.displayName || "Anonymous";
        await savePlaylist(currentUser.email ?? "", playlistUrl, userName);
      }

      // Redirect to the start page after login
      navigate("/start");
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      // signInWithPopup resolves with user info
      const userCred = await signInWithPopup(firebaseAuth, provider);
      const currentUser = userCred.user;
      if (playlistUrl) {
        const userName = currentUser.displayName || "Anonymous";
        await savePlaylist(currentUser.email ?? "", playlistUrl, userName);
      }

      // Redirect to the start page after login
      navigate("/start");
    } catch (error: any) {
      alert("Google sign-in error: " + error.message);
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient-xy p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground mb-8 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Where should we send the summaries?</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full"
            >
              {loading ? "Logging in..." : "Log in & Get Summaries"}
            </button>

            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors mt-4"
            >
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 
                  2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 
                  1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                  20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                  8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 
                  2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 
                  2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup2"
              state={{ playlistUrl }}
              className="text-primary hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login2;
