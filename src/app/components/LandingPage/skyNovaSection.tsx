import React from 'react';

const SkyNovaSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <img
            src="/nova.png" // Replace with your logo path
            alt="SkyNova Logo"
            className="mx-auto h-16"
          />
          <p className="text-teal-400 text-xl font-medium">Navigating the skies</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Are You Ready To Become an <span className="text-teal-400">Aviator?</span>
            </h2>
            <p className="text-gray-300">
              Sky Nova features quizzes to assess pilot knowledge and skills. It reduces risks and costs, with various aircraft and scenarios. It makes flying practice or adventure fun and easy. Just fasten your seat belt, wear your virtual headset, and fly away. Sky Nova is the ultimate training tool. You can explore the skies with endless possibilities. With Sky Nova, the sky is truly the limit.
            </p>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Join Now
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 md:ml-10">
            <img
              src="/public/smilingAviator.jpg" // Replace with your uploaded image path
              alt="Aviator in cockpit"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyNovaSection;
