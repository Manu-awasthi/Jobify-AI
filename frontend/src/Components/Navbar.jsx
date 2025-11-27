import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-blue-500 tracking-wide">
          JOBIFY<span className="text-white">-AI</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">
          <a
            href="#home"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#analyze"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Analyze Resume
          </a>
          <a
            href="#login"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </a>
          <a
            href="#signup"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Signup
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex flex-col gap-1 cursor-pointer">
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
