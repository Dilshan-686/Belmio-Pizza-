import React from "react";
import heroImage from "../../assests/hero-image.png";
import Services from "../Services";


const Ser = () => {
  return (
    <>
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
            OUR
            <span className="text-orange-500"> SERVICES</span>
          </h1>
          <p className="mt-4  text-left text-white md:text-base leading-relaxed ml-24">
            HOME/SERVICES
          </p>

          <div className="absolute bottom-0 left-[-100px] w-[400px] h-2 bg-orange-500"></div>
        </div>


      </section>

      <Services />


    </>
    
  );
};

export default Ser;