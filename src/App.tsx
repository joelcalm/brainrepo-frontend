// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
import Login2 from "@/pages/Login2";
import SignUp2 from "@/pages/SignUp2";
import Success from "@/pages/Success";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Our new special routes */}
      <Route path="/login2" element={<Login2 />} />
      <Route path="/signup2" element={<SignUp2 />} />

      <Route path="/success" element={<Success />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
