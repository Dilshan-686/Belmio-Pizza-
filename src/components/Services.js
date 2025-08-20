import React from 'react';
import { motion } from 'framer-motion';
import delivery from '../assests/4.jpg';
import food from '../assests/3.jpg';
import reservation from '../assests/2.jpg';
import truck from '../assests/1.jpg';
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="bg-mygray text-center px-4 py-8 md:py-16 md:px-16 xl:px-36">
      {/* Title and Learn More Button */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-passion font-extrabold text-gray-800 mt-[-8px] md:mt-[-20px] ml-2 md:ml-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          OUR <span className="text-orange-500">SERVICES</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/services" className="px-5 py-3 bg-orange-500 font-semibold rounded text-white hover:bg-orange-600 transition">
            LEARN MORE
          </Link>
        </motion.div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Service 1: Fast Delivery */}
        <Link to="/services/fastDelivery">
          <motion.button
            className="relative w-full h-[300px] sm:h-[320px] md:h-[360px] border border-gray-300 rounded-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={delivery} alt="Fast Delivery" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-lg sm:text-xl font-passion font-extrabold bg-black bg-opacity-50 text-white py-3 text-center">
              FAST DELIVERY
            </div>
          </motion.button>
        </Link>

        {/* Service 2: Healthy Foods */}
        <Link to="/menu">
          <motion.button
            className="relative w-full h-[300px] sm:h-[320px] md:h-[360px] border border-gray-300 rounded-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={food} alt="Healthy Foods" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-lg sm:text-xl font-passion font-extrabold bg-black bg-opacity-50 text-white py-3 text-center">
              HEALTHY FOODS
            </div>
          </motion.button>
        </Link>

        {/* Service 3: Reservation */}
        <Link to="/services/table">
          <motion.button
            className="relative w-full h-[300px] sm:h-[320px] md:h-[360px] border border-gray-300 rounded-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={reservation} alt="Reservation" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-lg sm:text-xl font-passion font-extrabold bg-black bg-opacity-50 text-white py-3 text-center">
              RESERVATION
            </div>
          </motion.button>
        </Link>

        {/* Service 4: Food Truck */}
        <Link to="/services/foodTruck">
          <motion.button
            className="relative w-full h-[300px] sm:h-[320px] md:h-[360px] border border-gray-300 rounded-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={truck} alt="Food Truck" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-lg sm:text-xl font-passion font-extrabold bg-black bg-opacity-50 text-white py-3 text-center">
              FOOD TRUCK
            </div>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
