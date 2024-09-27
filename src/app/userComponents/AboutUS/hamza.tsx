import React from 'react';

const MyProfilee = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 bg-gray-100">
      {/* Image section */}
      <div className="w-full lg:w-6/12 flex-shrink-0">
        <img
          src="/MyProfileImage.png" 
          alt="My Profile"
          className="w-full h-auto object-cover rounded-md shadow-md"
        />
      </div>

     
      <div className="w-full lg:w-6/12 lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">MY PROFILE</h2>
        <p className="text-lg mt-4">
        A dedicated backend developer with extensive experience in building scalable and efficient web applications. I specialize in Node.js and MongoDB, utilizing these technologies to create robust server-side solutions that meet business requirements and enhance user experiences.I am experienced in integrating third-party services and APIs, which enhances functionality and user engagement. My commitment to code quality is reflected in my use of testing frameworks to ensure reliability and performance. I am also proficient in authentication and authorization mechanisms, ensuring that applications are secure and user data is protected.

I thrive in collaborative environments, working closely with frontend developers, UX/UI designers, and stakeholders to deliver high-quality products. Passionate about continuous learning, I stay updated with the latest trends in backend development and am eager to embrace new technologies that can enhance my skill set.
        </p>
      </div>
    </div>
  );
};

export default MyProfilee;
