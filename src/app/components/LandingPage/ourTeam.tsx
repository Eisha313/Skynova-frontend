
import React from "react";
import Image from "next/image";

const OurTeam = () => {
  return (
    <section className="bg-[#0B1226] text-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="flex items-center justify-center">
          <div className="w-20 h-2 bg-blue-500 rounded-md"></div>
          <h2 className="text-3xl md:text-4xl  font-extrabold tracking-widest mx-4">Our Team</h2>
          <div className="w-20 h-2 bg-blue-500 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          
          <div className="bg-[#1E2638] rounded-lg shadow-lg p-6 text-center">
            <div className="w-52 h-52 mx-auto overflow-hidden ">
              <Image
                src="/Elisa.png"
                alt="Eisha"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-bold mt-4">Eisha Kamran</h3>
            <p className="text-gray-400 text-sm">Front End developer</p>
          </div>

          {/** Team Member 2 */}
          <div className="bg-[#1E2638] rounded-lg shadow-lg p-6 text-center">
            <div className="w-52 h-52 mx-auto overflow-hidden ">
              <Image
                src="/hassan.webp"
                alt="Hassan"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-bold mt-4">Hassan Kamal</h3>
            <p className="text-gray-400 text-sm">Designer/Unity Master</p>
          </div>

          {/** Team Member 3 */}
          <div className="bg-[#1E2638] rounded-lg shadow-lg p-6 text-center">
            <div className="w-52 h-52 mx-auto overflow-hidden ">
              <Image
                src="/hamza.jpeg"
                alt="Hamza"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-bold mt-4">Hamza Safdar</h3>
            <p className="text-gray-400 text-sm">Backend Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
