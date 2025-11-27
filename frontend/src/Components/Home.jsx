import React from "react";
import { FaFileAlt, FaRobot, FaSearch, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-900/70 backdrop-blur-md fixed top-0 w-full z-10 shadow-lg">

        {/* Logo */}
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          JOBIFY-AI
        </motion.h1>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          {/* Register */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border border-blue-500 text-blue-400 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Register
          </motion.button>

          {/* Sign In */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </motion.button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Land Your Dream Job with{" "}
          <span className="text-blue-500">AI</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Get instant ATS score, resume feedback, and job match accuracy.
          Improve your chances of getting shortlisted — in seconds.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Upload Resume
          </button>
          <button className="border border-gray-600 px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition">
            Paste Job Description
          </button>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h3>

        <motion.div 
          className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {[
            {
              icon: <FaFileAlt className="text-blue-500 text-4xl mb-4" />,
              title: "Smart Resume Analysis",
              desc: "ATS scoring, keyword match & improvement suggestions."
            },
            {
              icon: <FaSearch className="text-blue-500 text-4xl mb-4" />,
              title: "Job Match Accuracy",
              desc: "Compare resume with job description instantly."
            },
            {
              icon: <FaRobot className="text-blue-500 text-4xl mb-4" />,
              title: "AI Suggestions",
              desc: "Improve skills, wording & bullet points smartly."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {card.icon}
              <h4 className="text-xl font-semibold">{card.title}</h4>
              <p className="text-gray-300 mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Upload Resume",
            "Paste Job Description",
            "AI Scans Everything",
            "Get Score & Improve"
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-xl text-center shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h4 className="text-xl mb-3 font-semibold">Step {index + 1}</h4>
              <p className="text-gray-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Improve Your Resume?</h3>
        <p className="text-lg mb-6">Let AI help you get shortlisted faster.</p>

        <motion.button
          className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold flex items-center mx-auto gap-2 shadow-xl"
          whileHover={{ scale: 1.07 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Start Now 
          <motion.span 
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight />
          </motion.span>
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} AI Resume Analyzer • All Rights Reserved
      </footer>
    </div>
  );
};

export default HomePage;
