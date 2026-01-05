import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import ResumeForm from "./Components/ResumeForm";

/**
 * App Router
 * - /        → Landing page
 * - /analyze → Resume Analyzer
 * - *        → 404 redirect
 */
const App = () => {
  return (
    <Routes>
      {/* Home / Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Resume Analyzer */}
      <Route path="/analyze" element={<ResumeForm />} />

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
