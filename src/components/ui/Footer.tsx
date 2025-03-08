// src/components/ui/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 border-t">
      <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-4 text-sm">
        <Link to="/privacy-policy" className="hover:text-primary">
          Privacy Policy
        </Link>
        <Link to="/cookies-policy" className="hover:text-primary">
          Cookies Policy
        </Link>
        <Link to="/general-conditions" className="hover:text-primary">
          General Conditions
        </Link>
        <Link to="/legal-notice" className="hover:text-primary">
          Legal Notice and Terms of Use
        </Link>
        <span>© BrainRepo Copyright 2025</span>
      </div>
    </footer>
  );
}

export default Footer;
