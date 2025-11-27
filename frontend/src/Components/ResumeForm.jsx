import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import Navbar from './Navbar'

const ResumeForm = () => {
  const [jobText, setJobText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobText) {
      alert("Please fill all fields and upload a resume!");
      return;
    }

    const formData = new FormData();
    formData.append("jobText", jobText);
    formData.append("resume", file);

    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:500/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
   <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
          JOBIFY-AI
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Upload your resume and paste the job description — let AI do the rest!
        </p>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col space-y-6"
        >
          {/* Job Description */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Job Description
            </label>
            <textarea
              name="job_description"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              rows="6"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder-gray-500"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Upload Resume (PDF or DOCX)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gradient-to-r file:from-blue-600 file:to-cyan-500
                         hover:file:from-blue-700 hover:file:to-cyan-600
                         file:text-white cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 
                       text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-8 bg-gray-900/70 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              🔍 Analysis Result
            </h3>
            <p className="text-gray-300">
              <strong>Score:</strong> {result.score || "N/A"}%
            </p>
            <p className="text-gray-300 mt-1">
              <strong>Skills Found:</strong> {result.skillMatch || "None"}
            </p>
            <p className="text-gray-300 mt-1">
              <strong>Feedback:</strong> {result.feedBack || "No feedback"}
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ResumeForm;
