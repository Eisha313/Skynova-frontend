import React from 'react';

const SupervisorProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 bg-custom-image text-white">
      
      <div className="w-full lg:w-6/12 flex-shrink-0">
        <img
          src="/TRA.png"
          alt="Supervisor"
          className="w-full h-auto object-cover rounded-md shadow-md"
        />
      </div>

      
      <div className="w-full lg:w-6/12 lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">TRA SUPERVISOR</h2>
        <p className="text-lg mt-4">
          I will describe myself as dynamic, versatile, and self-motivated with a 20+ years record of technical support for the important industrial segment in Pakistan.I have started my career from scratch in industrial engineering company, SKF Pakistan as “Junior Sales Engineer” and was among pioneer employee of the company, with basic objective to grow company’s sales in heavy segment. Later, joined Schaeffler Group Pakistan Office, as specialized person to look after heavy segments technical support (Cement, Sugar, Paper, Oil and Gas and Steel) in North of Pakistan. 
        </p>
      </div>
    </div>
  );
};

export default SupervisorProfile;
