// src/pages/Success.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient">

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-white/50 p-8 rounded-lg shadow-lg text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            All Set Up!
          </h1>
          <p className="text-lg text-muted-foreground">
            Every time you add a new video to your playlist, you will receive the summary to your inbox.
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

export default Success;
