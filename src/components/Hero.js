import React from "react";
import { motion } from "framer-motion";
import heroVideo from "../assests/intro.mp4";
import { Link } from "react-router-dom";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.01,
      duration: 0.3,
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Hero = () => {
  const animateText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section className="relative h-screen flex items-center pt-[64px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-100 scale-125"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 sm:px-8 md:px-16 lg:px-32 text-left w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-4xl sm:text-4xl md:text-3xl font-passion font-extrabold mb-1 tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("WELCOME TO ")}
          <span className="text-orange-500">{animateText("BELMIO")}</span>
          <span className="text-white">{animateText(" PIZZA")}</span>
        </motion.h2>

        {/* Subheading */}
        <motion.h2
          className="text-xl sm:text-3xl md:text-5xl font-passion font-extrabold leading-snug mt-2 mb-2 tracking-tighter"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("DISCOVER MORE ABOUT ")}
          <br />
        </motion.h2>

        {/* Highlight Heading */}
        <motion.h2
          className="text-xl sm:text-3xl md:text-5xl font-passion font-extrabold text-white mb-4 tracking-tighter leading-snug"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("OUR ")}
          <span className="text-orange-500">{animateText("DELICIOUS")}</span>
          <span className="text-white">{animateText(" FOODS")}</span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText(
            "Belmio Pizza is an authentic Italian pizzeria right here in Colombo, offering authentic thin crust pizzas"
          )}
        </motion.p>

        {/* Menu Link */}
        <div className="mt-6 sm:mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center font-passion text-lg sm:text-xl font-extrabold text-white rounded-lg"
          >
            MENU <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex items-center space-x-4">
        <button className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition">
          <span className="text-lg text-orange-500">←</span>
        </button>
        <div className="text-center text-white">
          <span className="text-sm sm:text-lg font-semibold">01</span>
          <span className="text-sm font-light"> / </span>
          <span className="text-sm sm:text-lg font-semibold">05</span>
        </div>
        <button className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition">
          <span className="text-lg text-orange-500">→</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
