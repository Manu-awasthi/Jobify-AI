import React from "react";
import { FaFileAlt, FaRobot, FaSearch, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 w-full z-10 bg-gray-900/70 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <motion.h1
            className="text-2xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            JOBIFY-AI
          </motion.h1>

          <div className="flex gap-4">
            <button
              className="border border-blue-500 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Register
            </button>

            <button
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="pt-36 pb-24 px-6 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Land Your Dream Job with{" "}
          <span className="text-blue-500">AI</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Get ATS score, job match accuracy, and AI-powered resume feedback —
          all in seconds.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/analyze")}
            className="bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Analyze Resume
          </button>

          <button
            onClick={() => navigate("/analyze")}
            className="border border-gray-600 px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
          >
            Try with Job Description
          </button>
        </motion.div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="py-24 px-6 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-14">
          Why Choose Jobify?
        </h3>

        <motion.div
          className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {[
            {
              icon: <FaFileAlt />,
              title: "ATS Resume Scoring",
              desc: "Realistic resume score based on job description."
            },
            {
              icon: <FaSearch />,
              title: "Skill Gap Detection",
              desc: "See matched and missing skills instantly."
            },
            {
              icon: <FaRobot />,
              title: "AI Feedback",
              desc: "Clear suggestions to improve resume quality."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition"
            >
              <div className="text-blue-500 text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-300 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="py-24 px-6">
        <h3 className="text-3xl font-bold text-center mb-14">
          How It Works
        </h3>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Upload Resume",
            "Paste Job Description",
            "AI Analyzes Match",
            "Get Score & Improve"
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-gray-900 p-6 rounded-xl text-center shadow-lg"
            >
              <h4 className="text-xl mb-3 font-semibold">
                Step {index + 1}
              </h4>
              <p className="text-gray-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-24 px-6 bg-blue-600 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Improve Your Resume?
        </h3>
        <p className="text-lg mb-8">
          Let AI help you get shortlisted faster.
        </p>

        <motion.button
          onClick={() => navigate("/analyze")}
          whileHover={{ scale: 1.08 }}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 mx-auto shadow-xl"
        >
          Start Now <FaArrowRight />
        </motion.button>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-6 text-center bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Jobify AI • All Rights Reserved
      </footer>
    </div>
  );
};

export default HomePage;
