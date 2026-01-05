import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";

const ResumeForm = () => {
  const [jobText, setJobText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file || !jobText.trim()) {
      setError("Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("jobText", jobText);
    formData.append("resume", file);

    setLoading(true);

    try {
      const res = await fetch("https://jobify-ai-7m7h.onrender.com/api/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        <div className="w-full max-w-3xl bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            JOBIFY-AI
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Upload your resume and paste the job description — let AI analyze your fit.
          </p>

          {/* -------- FORM -------- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Description */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Job Description
              </label>
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                rows="6"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 resize-none text-gray-200"
                placeholder="Paste the job description here..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:bg-gradient-to-r file:from-blue-600 file:to-cyan-500
                  hover:file:from-blue-700 hover:file:to-cyan-600
                  file:text-white cursor-pointer"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-400">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 
                         rounded-lg font-semibold flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </form>

          {/* -------- RESULT -------- */}
          {result && (
            <div className="mt-10 bg-gray-900/70 border border-gray-700 rounded-xl p-6 space-y-4">

              <h3 className="text-xl font-semibold text-blue-400">
                📊 Analysis Result
              </h3>

              <p>
                <strong>Resume Score:</strong>{" "}
                <span className="text-green-400">{result.score}/100</span>
              </p>

              <p>
                <strong>Skill Match:</strong>{" "}
                <span className="text-cyan-400">
                  {result.skillMatchPercentage}%
                </span>
              </p>

              {/* Matched Skills */}
              <div>
                <strong className="block mb-1">Matched Skills</strong>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <strong className="block mb-1">Missing Skills</strong>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <strong>Feedback</strong>
                <p className="text-gray-300 mt-1">{result.feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
