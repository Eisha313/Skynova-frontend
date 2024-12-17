import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const OurTeam = () => {
  return (
    <section className={`bg-[#0B1226] text-white py-16 px-6 ${poppins.className}`}>
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="flex items-center justify-center">
          <div className="w-20 h-2 bg-blue-500 rounded-md"></div>
          <h2 className="text-3xl md:text-4xl  font-extrabold tracking-widest mx-4">Our Team</h2>
          <div className="w-20 h-2 bg-blue-500 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-28 mt-10">
          {/** Team Member 1 */}
          <div className="bg-[#1E2638] rounded-2xl shadow-lg text-center">
            <div className="w-full h-full aspect-[1]  mx-auto relative">
              <Image
                src="/eish.jpg"
                alt="Eisha"
                width={600}
                height={600}
                className="object-cover w-full h-full rounded-t-2xl"
              />
              <div className="py-4 text-center bg-[#272a336e]  rounded-b-2xl">
                <h3 className="text-xl font-bold">Eisha Kamran</h3>
                <p className="text-white text-md">Front End developer</p>
              </div>
            </div>
          </div>

          {/** Team Member 2 */}
          <div className="bg-[#1E2638] rounded-2xl shadow-lg text-center">
            <div className="w-full h-full aspect-[1]  mx-auto relative">
              <Image
                src="/hassan.webp"
                alt="Hassan"
                width={600}
                height={600}
                className="object-cover w-full h-full object-top  rounded-t-2xl"
              />
              <div className="py-4 text-center bg-[#272a336e]  rounded-b-2xl">
                <h3 className="text-xl font-bold">Hassan Kamal</h3>
                <p className="text-white text-md">Designer/Unity Master</p>
              </div>
            </div>
          </div>

          {/** Team Member 3 */}
          <div className="bg-[#1E2638] rounded-2xl shadow-lg text-center">
            <div className="w-full h-full aspect-[1]  mx-auto relative">
              <Image
                src="/hamza.jpeg"
                alt="Hamza"
                width={600}
                height={600}
                className="object-cover w-full h-full  rounded-t-2xl"
              />
              <div className="py-4 text-center bg-[#272a336e]  rounded-b-2xl">
                <h3 className="text-xl font-bold">Hamza Safdar</h3>
                <p className="text-white text-md">Backend Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
