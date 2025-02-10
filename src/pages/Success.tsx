// src/pages/Success.tsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your plan has been upgraded successfully.
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          Your credits have been updated. You can now enjoy more summaries and stay ahead!
        </p>

        <div className="space-y-3 sm:space-x-3 sm:space-y-0 sm:flex sm:justify-center">
          <Link
            to="/plan"
            className="button-primary inline-block px-6 py-2 rounded-md shadow text-white 
                       bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            View Your Plan
          </Link>
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-md border border-gray-300 text-gray-700 
                       hover:bg-gray-50 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
