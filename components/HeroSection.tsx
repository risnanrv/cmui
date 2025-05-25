"use client";

import { motion } from "framer-motion";

export default function Hero() {

  

  return (
    <section className="relative w-full py-20 px-6 sm:px-8 md:px-16 overflow-hidden ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-block px-5 py-2 text-sm font-semibold tracking-wide text-[#4459ff] bg-[#4459ff]/10 rounded-full mb-6 uppercase"
        >
          Web3 Platform
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4459ff] to-blue-600">
            Your New Web3
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-[#4459ff]">
            Super App
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto"
        >
          Manage your Web3 projects, daily activities, and progress—all in one powerful dashboard.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 30px -6px rgba(68, 89, 255, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-4 bg-gradient-to-r from-[#4459ff] to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Join now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#4459ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 30px -6px rgba(68, 89, 255, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-4 border-2 border-[#4459ff] text-[#4459ff] font-semibold text-lg rounded-xl hover:bg-[#4459ff]/10 transition-all duration-300"
          >
            Learn more
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
