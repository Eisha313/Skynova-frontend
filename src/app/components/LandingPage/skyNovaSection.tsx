
import React from 'react';
import Link from 'next/link';

const SkyNovaSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-10">
          <img
            src="/nova.png"
            alt="SkyNova Logo"
            className="mx-auto h-16"
          />
          <p className="text-teal-400 text-xl font-medium">Navigating the skies</p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Are You Ready To Become an <span className="text-teal-400">Aviator?</span>
            </h2>
            <p className="text-gray-300">
              Sky Nova features quizzes to assess pilot knowledge and skills. It reduces risks and costs, with various aircraft and scenarios. It makes flying practice or adventure fun and easy. Just fasten your seat belt, wear your virtual headset, and fly away. Sky Nova is the ultimate training tool. You can explore the skies with endless possibilities. With Sky Nova, the sky is truly the limit.
            </p>
            <Link href="/signup">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Join Now
            </button>
            </Link>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 md:ml-10">
            <img
              src="/smile.png"
              alt="Aviator in cockpit"
              className="w-full h-64 md:h-80 object-cover  shadow-lg border-t-8 border-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyNovaSection;
// import React from 'react';
// import { useInView } from 'react-intersection-observer';

// const SkyNovaSection: React.FC = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.1, 
//     triggerOnce: true, 
//   });

//   return (
//     <section ref={ref} className="bg-gray-900 text-white py-16">
//       {inView && ( 
//         <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
//           <div className="text-center mb-10">
//             <img
//               src="/nova.png"
//               alt="SkyNova Logo"
//               className="mx-auto h-16"
//             />
//             <p className="text-teal-400 text-xl font-medium">Navigating the skies</p>
//           </div>

//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 space-y-6">
//               <h2 className="text-3xl md:text-4xl font-bold">
//                 Are You Ready To Become an <span className="text-teal-400">Aviator?</span>
//               </h2>
//               <p className="text-gray-300">
//                 Sky Nova features quizzes to assess pilot knowledge and skills. It reduces risks and costs, with various aircraft and scenarios. It makes flying practice or adventure fun and easy. Just fasten your seat belt, wear your virtual headset, and fly away. Sky Nova is the ultimate training tool. You can explore the skies with endless possibilities. With Sky Nova, the sky is truly the limit.
//               </p>
//               <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
//                 Join Now
//               </button>
//             </div>

//             <div className="md:w-1/2 mt-10 md:mt-0 md:ml-10">
//               <img
//                 src="/smile.png"
//                 alt="Aviator in cockpit"
//                 className="w-full h-64 md:h-80 object-cover shadow-lg border-t-8 border-white"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default SkyNovaSection;
