import React from "react";
import heroImage from "../../assests/AboutUs.png";
import storyImage from "../../assests/oven.jpg";
import CheffImage from "../../assests/cheff-image.png";
import outlet from "../../assests/story-image.jpg";
import outlet2 from "../../assests/branch2.jpg";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            ABOUT
            <span className="text-orange-500"> US</span>
          </h1>
          <p className="mt-4 text-left text-white md:text-base leading-relaxed ml-24">
            HOME/ABOUT US
          </p>

          <div className="absolute bottom-0 left-[-100px] w-[400px] h-2 bg-orange-500"></div>
        </div>
      </section>

      {/* Story Section */}
      <div className="py-16 bg-white w-full">
        <div className="w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8 mb-20">
          {/* Left Column */}
          <div className="lg:w-1/2 mr-4">
            {/* Image */}
            <img
              src={storyImage}
              alt="Belmio Pizza Shop"
              className="rounded shadow-lg w-full"
            />
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-col justify-start ml-5">
            <div className="mb-10">
              <h2 className="text-4xl font-bold">
                BELMIO<span className="text-orange-500"> PIZZA</span>
              </h2>
            </div>
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Quam ultrices bibendum accumsan morbi risus iaculis tellus tellus
              molestie. Auctor eu auctor aliquam porttitor scelerisque massa
              volutpat elit, urna. Eget quis porta euismod diam justo, tempor
              vehicula. Egestas turpis vel non diam nunc amet, a risus diam.
              Ultrices ac blandit sem nec nulla nisi habitasse. Aliquet
              pellentesque potenti massa eget pellentesque. Feugiat turpis in a
              sed. Nisl tincidunt cras tempus ipsum, sollicitudin vitae facilisis
              quis volutpat.
            </p>
          </div>
        </div>
      </div>

      {/* Cheff Section */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8 mb-20">
        {/* Left Column */}
        <div className="lg:w-1/2 flex flex-col justify-start ml-5">
          <div className="mb-10">
            <h2 className="text-4xl font-bold">
              OUR<span className="text-orange-500"> CHEFF</span>
            </h2>
          </div>
          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
            Quam ultrices bibendum accumsan morbi risus iaculis tellus tellus
            molestie. Auctor eu auctor aliquam porttitor scelerisque massa
            volutpat elit, urna. Eget quis porta euismod diam justo, tempor
            vehicula. Egestas turpis vel non diam nunc amet, a risus diam.
            Ultrices ac blandit sem nec nulla nisi habitasse. Aliquet
            pellentesque potenti massa eget pellentesque. Feugiat turpis in a
            sed. Nisl tincidunt cras tempus ipsum, sollicitudin vitae facilisis
            quis volutpat.
          </p>
        </div>

        <div className="lg:w-1/2 mr-4">
          {/* Image */}
          <img
            src={CheffImage}
            alt="Belmio Pizza Shop"
            className="rounded shadow-lg w-full"
          />
        </div>
      </div>

      {/* Outlets Section */}
      <div className="bg-gray-100 pt-10 pb-20 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-bold text-black mb-8">
            OUR <span className="text-orange-500">OUTLETS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outlet 1 */}
            <a
              href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25b1aedf162ab:0x2dc3df881740df18!8m2!3d6.8938806!4d79.9051921!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgESaXRhbGlhbl9yZXN0YXVyYW504AEA!16s%2Fg%2F11n0blz_69?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={outlet}
                alt="Outlet"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-center h-40 flex flex-col justify-center p-4">
                <p className="text-2xl font-bold text-left">
                  123/AB, ATHULKOTTE, COLOMBO
                </p>
                <p className="mt-2 text-2xl font-bold text-left">
                  CALL NOW –{" "}
                  <span className="text-orange-500 font-bold">
                    077 123 4567
                  </span>
                </p>
              </div>
            </a>

            {/* Outlet 2 */}
            <a
              href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25097735c61dd:0xf9ad240bf76af948!8m2!3d6.8755645!4d79.9319902!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11c48n48ht?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={outlet2}
                alt="Outlet"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-center h-40 flex flex-col justify-center p-4">
                <p className="text-2xl font-bold text-left">
                  456/CD, THALAWATHOGODA, COLOMBO
                </p>
                <p className="mt-2 text-2xl font-bold text-left">
                  CALL NOW –{" "}
                  <span className="text-orange-500 font-bold">
                    077 123 4567
                  </span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-grayscale py-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800">
          <span className="text-gray-400">REVIEW</span> <br />
          <span className="text-black">
            GET IN <span className="text-orange-500">TOUCH</span>
          </span>
        </h2>

        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-lg font-bold text-gray-800"
                htmlFor="name"
              >
                NAME
              </label>
              <input
                type="text"
                id="name"
                placeholder="AmilaChandima"
                className="mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                className="block text-lg font-bold text-gray-800"
                htmlFor="email"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                placeholder="AmilaChandima@gmail.com"
                className="mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                className="block text-lg font-bold text-gray-800"
                htmlFor="subject"
              >
                SUBJECT
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter your subject"
                className="mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-lg font-bold text-gray-800"
              htmlFor="message"
            >
              MESSAGE
            </label>
            <textarea
              id="message"
              placeholder="Enter your message here..."
              rows="5"
              className="mt-2 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-orange-500 text-white font-bold py-3 px-6 rounded hover:bg-orange-600 transition duration-300"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
