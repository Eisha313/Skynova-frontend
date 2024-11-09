
import React from "react";
import Image from "next/image";
import welcomePlane from "/public/welcomePlane.png"; 



const WelcomeAviators = () => {
  return (
    <section className="relative bg-[#0B1226] text-white py-16 px-6">
      {/* Stripes and Heading */}
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
        <h2 className="text-sm tracking-widest text-gray-400">WELCOME</h2>
        <h1 className="text-4xl md:text-6xl font-bold mt-2">Aviators</h1>
        <div className="flex justify-center items-center mt-2">
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
        {/* Icon/Divider */}
        <div className="flex justify-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20m7-10H5"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col-reverse lg:flex-row items-center max-w-screen-xl mx-auto mt-8">
        {/* Vertical Stripes */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[2px] h-[200px] bg-blue-500/30 mx-8"></div>
          <div className="w-[2px] h-[300px] bg-blue-500/30 mx-8"></div>
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-500">
            SkyNova
          </h3>
          <h4 className="text-lg md:text-xl font-semibold mt-2">
            VR Flight Simulator
          </h4>
          <p className="text-gray-400 text-sm md:text-base mt-4">
            It helps aviators develop vital aviation skills and improve their
            learning curve. It offers more than standard training, with
            interactive flying exercises, decision-making scenarios, and
            emergency responses.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">
            Join Now
          </button>
        </div>

        {/* Plane Image */}
        <div className="lg:w-1/2 flex justify-center z-10">
          <div className="relative w-full max-w-lg">
            <Image
              src={welcomePlane}
              alt="VR Flight Simulator Plane"
              className="animate-zoom"
              layout="intrinsic"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeAviators;
