// src/pages/NotFound.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-gradient bg-[length:200%_200%] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 rounded-xl shadow-lg p-8 text-center">
        <h1 className="title text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a
          href="/"
          className="button-primary inline-block px-6 py-2 rounded-md shadow text-white"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
