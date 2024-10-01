import React from "react";

const MyProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 bg-gray-100">
      {/* Image section */}
      <div className="w-full lg:w-6/12 lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">EISHA KAMRAN ABBASI</h2>
        <p className="text-lg mt-4">
          An experienced front-end developer with a passion for creating
          engaging and user-friendly web applications. I have successfully
          worked on numerous projects, leveraging my skills in HTML, CSS, and
          JavaScript, along with modern frameworks such as React and Next.js.
          Proficient in TypeScript, I ensure that my code is not only robust but
          also maintainable and scalable.With a keen eye for detail and a
          commitment to best practices, I continuously strive to enhance my
          skills and stay updated with the latest industry trends. I am excited
          about the opportunity to contribute to innovative projects and create
          impactful user experiences.
        </p>
      </div>
      <div className="w-full lg:w-6/12 flex-shrink-0">
        <img
          src="/avatar.png"
          alt="My Profile"
          className="w-full h-auto object-cover rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default MyProfile;
