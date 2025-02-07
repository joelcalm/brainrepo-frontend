import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "@/integrations/firebase/client";

export default function SignUp2() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // The playlistUrl is passed from Index.tsx with navigate("/signup2", { state: { playlistUrl } })
  const playlistUrl = location.state?.playlistUrl || "";

  // Local form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // optional user name
  const [loading, setLoading] = useState(false);

  // For POST call to your FastAPI with name included
  const savePlaylist = async (userEmail: string, url: string, userName: string) => {
    const response = await fetch("http://localhost:8000/save-playlist", {
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
    console.log("Backend response:", data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (playlistUrl) {
        await savePlaylist(userCred.user.email ?? "", playlistUrl, name);
        
        navigate("/success");

        // Call process_all via the /run-cron endpoint
        const response = await fetch("http://localhost:8000/run-cron");
        const result = await response.json();
        console.log("Process All Result:", result);
      }
      
    } catch (error: any) {
      alert("Sign up error: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "consent" });
      const userCred = await signInWithPopup(firebaseAuth, provider);
      const userName = userCred.user.displayName || name;
      if (playlistUrl) {
        await savePlaylist(userCred.user.email ?? "", playlistUrl, userName);
        
        navigate("/success");

        // Call process_all via the /run-cron endpoint
        const response = await fetch("http://localhost:8000/run-cron");
        const result = await response.json();
        console.log("Process All Result:", result);
      }
      
    } catch (error: any) {
      alert("Google sign-up error: " + error.message);
      console.error(error);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="LeBron"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button 
              type="submit" 
              className="button-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up & Get Summaries"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
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
            Already have an account?{" "}
            {/* Pass playlistUrl to login2 so they can store it after login */}
            <Link
              to="/login2"
              state={{ playlistUrl }}
              className="text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}