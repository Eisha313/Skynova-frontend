// import React from "react";
// import Image from "next/image";
// import welcomePlane from "/public/welcomePlane.png";
// import stripe1 from "/public/stripe1.png";
// import stripe2 from "/public/stripe2.png";

// const WelcomeAviators = () => {
//   return (
//     <section className="relative bg-[#0B1226] text-white py-16 px-6">

//       <div className="absolute inset-0 flex justify-center lg:justify-end items-center pointer-events-none">

//         <div className="hidden lg:block relative">
//           <Image
//             src={stripe1}
//             alt="Left Stripe"
//             width={190}
//             height={300}
//             className="absolute left-1/3 top-20 opacity-60"
//           />
//         </div>

//         <div className="hidden lg:block">
//           <Image
//             src={stripe2}
//             alt="Right Stripe"
//             width={40}
//             height={400}
//             className="absolute right-[4%] "
//           />
//         </div>
//       </div>

//       <div className="max-w-screen-xl mx-auto text-center">

//         <div className="flex items-center justify-between mx-auto max-w-xs">
//           <div className="w-16 h-1 bg-blue-500"></div>
//           <h2 className="text-sm tracking-widest text-gray-400">WELCOME</h2>
//           <div className="w-16 h-1 bg-blue-500"></div>
//         </div>
//         <h1 className="text-4xl md:text-6xl font-bold mt-4">Aviators</h1>
//         <div className="mt-6 flex justify-center">
//           <Image
//             src="/wings.png"
//             width={100}
//             height={100}
//             alt="Wings Icon"
//             className="mx-auto"
//           />
//         </div>
//       </div>

//       <div className="flex flex-col-reverse lg:flex-row items-center max-w-screen-xl mx-auto mt-16">

//         <div className="lg:w-1/2 text-center lg:text-left px-6">
//           <h3 className="text-3xl md:text-4xl font-bold text-blue-500">
//             SkyNova
//           </h3>
//           <h4 className="text-lg md:text-xl font-semibold mt-2">
//             VR Flight Simulator
//           </h4>
//           <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed">
//             It helps aviators develop vital aviation skills and improve their
//             learning curve. It offers more than standard training, with
//             interactive flying exercises, decision-making scenarios, and
//             emergency responses.
//           </p>
//           <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">
//             Join Now
//           </button>
//         </div>

//         <div className="lg:w-1/2 flex justify-center relative z-10">
//           <Image
//             src={welcomePlane}
//             alt="VR Flight Simulator Plane"
//             className="animate-zoom"
//             layout="intrinsic"
//             width={600}
//             height={400}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WelcomeAviators;
import React from "react";
import Image from "next/image";
import welcomePlane from "/public/welcomePlane.png";
import stripe1 from "/public/stripe1.png";
import stripe2 from "/public/stripe2.png";
import Link from "next/link";
const WelcomeAviators = () => {
  return (
    <section className="relative bg-[#0B1226] text-white py-16 px-6 overflow-hidden">
      {/* Background Stripes */}
      <div className="absolute inset-0 pointer-events-none flex justify-between">
        <Image
          src={stripe1}
          alt="Left Stripe"
          width={90}
          height={500}
          className="absolute right-[26%]  opacity-60 hidden lg:block"
        />
        <Image
          src={stripe2}
          alt="Right Stripe"
          width={90}
          height={500}
          className="absolute right-[19%]  opacity-60 hidden lg:block"
        />
      </div>

      {/* Header */}
      <div className="text-center max-w-screen-lg mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-1 bg-blue-500"></div>
          <h2 className="text-sm tracking-widest text-gray-400">WELCOME</h2>
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mt-4">Aviators</h1>
        <div className="mt-4 flex justify-center">
          <Image src="/wings.png" width={100} height={100} alt="Wings Icon" className="mx-auto" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-16 mx-auto px-8 max-w-[1000px] lg:max-w-[80%] lg:ml-40">
        {/* Text Section */}
        <div className="lg:w-[60%] text-center lg:text-left px-6">
          <h3 className="text-4xl md:text-6xl font-bold text-[#5AA0BC]">SkyNova</h3>
          <div className="flex relative mt-8">
            <div className="absolute left-0 w-2 bg-blue-500 h-full rounded-md"></div>
            <div className="pl-6">
              <h4 className="text-2xl md:text-3xl font-bold mt-2">VR Flight Simulator</h4>
              <p className="text-white/80 text-sm md:text-base mt-4 leading-relaxed">
                It helps aviators develop vital aviation skills and improve their learning curve. It offers more than
                standard training, with interactive flying exercises, decision-making scenarios, and emergency
                responses.
              </p>
              <Link href="/signup">
                <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-sm shadow-lg hover:bg-blue-600 transition">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center relative z-10">
          <Image src={welcomePlane} alt="VR Flight Simulator Plane" width={600} height={400} className="animate-zoom" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeAviators;
