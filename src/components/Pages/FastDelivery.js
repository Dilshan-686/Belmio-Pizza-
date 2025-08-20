import React from "react";
import Deli from "../../assests/FDD.png";
import Delivery from "../../assests/4.jpg";

const FastDelivery = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${Deli})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            FAST <span className="text-orange-500">DELIVERY</span>
          </h1>
          <p className="mt-4  text-left text-white md:text-base leading-relaxed ml-24">
            HOME / FAST DELIVERY
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/2 mr-4">
            {/* Image */}
            <img
              src={Delivery}
              alt="Belmio Pizza Shop"
              className="rounded shadow-lg w-full"
            />
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-col justify-start ml-5">
            {/* Heading */}
            <h2 className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-8">
              FAST<span className="text-orange-500">DELIVERY</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              Belmio Pizza, founded in 2016, is a vibrant and beloved pizza restaurant nestled in the heart of Thalawathugoda. Known for its authentic flavors and fresh ingredients, Belmio Pizza has become a go-to destination for pizza lovers seeking a blend of tradition and innovation. With a commitment to quality and customer satisfaction, the restaurant continues to serve delicious, handcrafted pizzas that bring people together, creating memorable dining experiences for families and friends.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Belmio Pizza is now expanding its reach by embracing technology to enhance customer convenience and engagement. With plans to launch its first e-commerce platform, the restaurant aims to make online ordering and promotions more accessible to its growing customer base.
            </p>

            {/* Learn More Button */}
            <div className="mt-4 self-start">
              <a
                href="#learn-more"
                className="px-5 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
              >
                VIEW OUR PRODUCT
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FastDelivery;