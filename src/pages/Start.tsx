// src/pages/Start.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Start: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient bg-[length:200%_200%]">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-white/50 p-8 rounded-lg shadow-lg text-center"
        >
          <h1 className="title text-4xl md:text-5xl font-bold mb-4">
            You’re All Set!
          </h1>
          <p className="text-lg text-muted-foreground">
            From now on, whenever you add a new video to your playlist, we’ll send you a structured summary straight to your inbox.
          </p>
          <p className="mt-4 text-lg">
            🚀 Enjoy smarter learning, effortlessly!
          </p>
          <div className="mt-8">
            <Link to="/" className="button-primary whitespace-nowrap">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Start;
