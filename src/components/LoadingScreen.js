import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  // Animation for the spinning pizza
  const pizzaAnimation = {
    rotate: [0, 360], // Spin 360 degrees
    transition: {
      repeat: Infinity, // Repeat indefinitely
      duration: 1.5, // Spin duration
      ease: "linear", // Smooth linear spin
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <motion.div
        animate={pizzaAnimation}
        className="text-6xl md:text-8xl"
      >
        🍕
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-white text-lg md:text-xl font-poppins mt-4"
      >
        Preparing your pizza...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;