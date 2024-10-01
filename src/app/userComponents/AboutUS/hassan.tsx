import React from 'react';

const MyProfileee = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 bg-gray-100">
      {/* Image section */}
      <div className="w-full lg:w-6/12 lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">HASSAN KAMAL</h2>
        <p className="text-lg mt-4">
          A creative and skilled 3D designer with expertise in Blender and Unity, dedicated to bringing imaginative concepts to life through stunning visuals and engaging interactive experiences. My passion for design and technology drives me to create high-quality 3D models, animations, and environments that captivate users and enhance gameplay.

          With a strong foundation in 3D modeling and animation, I excel at transforming ideas into realistic assets for games, simulations, and visualizations. Proficient in Blender&#39;s advanced features, I can produce detailed characters, intricate environments, and dynamic animations that align with the project&#39;s artistic vision. My keen eye for detail ensures that every model is optimized for performance and aesthetics, striking a balance that enhances the user experience.
        </p>
      </div>
      <div className="w-full lg:w-6/12 flex-shrink-0">
        <img
          src="/hassan.webp"
          alt="My Profile"
          className="w-full h-auto object-cover rounded-md shadow-md"
        />
      </div>
    </div>
  );
};


export default MyProfileee;
