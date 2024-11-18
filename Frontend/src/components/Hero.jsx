import React from "react";
import { motion } from "framer-motion";
import { PenLine, BookOpen, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-gray-400 bg-clip-text text-transparent">
              Share your Stories
            </span>{" "}
            <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
              and Experiences
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A peaceful space to read, write and share about you and your life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className="px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 transition-opacity"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="p-6 rounded-xl bg-[#12121a] border border-gray-800 hover:border-gray-700 transition-colors">
              <PenLine className="w-12 h-12 mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">Write Stories</h3>
              <p className="text-gray-400">
                Express yourself through writing in a distraction-free
                environment.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#12121a] border border-gray-800 hover:border-gray-700 transition-colors">
              <BookOpen className="w-12 h-12 mb-4 text-amber-500" />
              <h3 className="text-xl font-semibold mb-2">Read Stories</h3>
              <p className="text-gray-400">
                Discover inspiring stories from people around the world.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#12121a] border border-gray-800 hover:border-gray-700 transition-colors">
              <Share2 className="w-12 h-12 mb-4 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Share Stories</h3>
              <p className="text-gray-400">
                Connect with others by sharing your unique perspectives.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-amber-500/10 animate-gradient" />
      </div>
    </div>
  );
}

export default Hero;
