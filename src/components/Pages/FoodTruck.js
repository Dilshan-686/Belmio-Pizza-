import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Truck from "../../assests/FT.png";
import axios from "axios";
import { toast } from "react-toastify";

const FoodTruck = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !formData.name || !formData.contact || !formData.location) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/foodtruck-reservations", {
        date: selectedDate.toISOString().split("T")[0],
        name: formData.name,
        contact: formData.contact,
        location: formData.location,
      });

      toast.success("Reservation submitted successfully!");
      setSelectedDate(null);
      setFormData({ name: "", contact: "", location: "" });
    } catch (err) {
      toast.error("Submission failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[75vh] flex items-center"
        style={{ backgroundImage: `url(${Truck})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            FOOD <span className="text-orange-500">TRUCK</span>
          </h1>
          <p className="mt-4 text-left text-white md:text-base leading-relaxed ml-24">
            HOME / SERVICES / FOOD TRUCK
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="bg-grayscale py-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto font-passion font-extrabold">
        <h2 className="text-4xl text-gray-800">
          <span className="text-gray-600">FOOD </span>
          <span className="text-black">
            TRUCK <span className="text-orange-500">BOOKING</span>
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 font-passion">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-extrabold text-gray-800">DATE</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy MMMM dd"
                placeholderText="Select a date"
                className="bg-mygray font-bold mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-800">NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="bg-mygray font-bold mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-lg font-extrabold text-gray-800">CONTACT NUMBER</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
                className="bg-mygray font-bold mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-lg font-extrabold text-gray-800">LOCATION</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="bg-mygray font-bold mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-end justify-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-orange-500 text-white font-extrabold py-3 px-6 rounded hover:bg-orange-600 transition duration-300"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FoodTruck;
