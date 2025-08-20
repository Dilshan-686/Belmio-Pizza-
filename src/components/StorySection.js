import React from "react";
import { motion } from "framer-motion";
import storyImage from "../assests/story-image.jpg";
import { Link } from "react-router-dom";

function StorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8">
        {/* Left Column with Image Animation */}
        <motion.div
          className="lg:w-1/2 mr-4"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Heading with Fade-In Animation */}
          <motion.h2
            className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            DISCOVER OUR <span className="text-orange-500">STORY</span>
          </motion.h2>

          {/* Image with Scale and Rotate Animation */}
          <motion.img
            src={storyImage}
            alt="Belmio Pizza Shop"
            className="rounded shadow-lg w-full"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.03, rotate: 2, transition: { duration: 0.3 } }}
          />
        </motion.div>

        {/* Right Column with Staggered Text Animation */}
        <motion.div
          className="lg:w-1/2 flex flex-col justify-start ml-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Description Paragraphs with Staggered Fade-In */}
          <motion.p
            className="text-gray-600 leading-relaxed mb-6 text-justify"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Belmio Pizza, founded in 2016, is a vibrant and beloved pizza restaurant nestled in the heart of Thalawathugoda. Known for its authentic flavors and fresh ingredients, Belmio Pizza has become a go-to destination for pizza lovers seeking a blend of tradition and innovation. With a commitment to quality and customer satisfaction, the restaurant continues to serve delicious, handcrafted pizzas that bring people together, creating memorable dining experiences for families and friends.
          </motion.p>

          <motion.p
            className="text-gray-600 leading-relaxed mb-8 text-justify"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Belmio Pizza is now expanding its reach by embracing technology to enhance customer convenience and engagement. With plans to launch its first e-commerce platform, the restaurant aims to make online ordering and promotions more accessible to its growing customer base.
          </motion.p>

          {/* Details Section with Staggered Fade-In */}
          <motion.div
            className="flex gap-8 mb-8 justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                SINCE <span className="text-blue-600">2015</span>
              </h3>
              <p className="text-gray-600">
                Serving quality, tradition, and unforgettable flavors with every slice
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                10K+ <span className="text-blue-600">CLIENTS</span>
              </h3>
              <p className="text-gray-600">
                Trusted by over 10,000 happy clients who love our delicious pizzas
              </p>
            </div>
          </motion.div>

          {/* Learn More Button with Lift and Scale Animation */}
          <motion.div
            className="mt-4 self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
            >
              <Link
                to="/aboutUs"
                className="px-5 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default StorySection;
