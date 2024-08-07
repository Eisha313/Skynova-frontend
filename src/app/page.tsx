// import Link from "next/link";
// import Image from "next/image";


// export default function Home() {
 
  
//   return (
//     <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
//       <Image
//         src="/homewallpaper.svg"
//         alt="airplane logo"
//         layout="fill"
//         objectFit="cover"
//         className="w-full h-full"
//       />

//       <div className="relative z-10 w-full max-w-5xl mx-auto mt-1">
//         <div className="flex flex-wrap justify-between gap-4 md:gap-6 lg:gap-8">
//           <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Home
//           </button>
//           <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Training
//           </button>
//           <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Quiz Mania
//           </button>
//           <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Medical Test
//           </button>
//           <Link href="/certificate-page"> <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//               Certificates
//             </button>
//             </Link>
//           <button className="flex-grow px-2 px-4 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Button 6
//           </button>
//           <div className="flex gap-4 md:gap-6 lg:gap-8">
//           <Link href="/login"> <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//               Login
//             </button>
//             </Link>
//             <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//               Register
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="fixed top-1/2 left-0 right-0 mx-auto flex flex-col items-center">
//         <Image
//           src="/skylogo.svg"
//           alt="fancy s"
//           width={400}  // Increased size
//           height={400} // Increased size
//           className="object-contain"
//         />
        
//         <div className="mt-8">
//         <Link href="/signup">
//           <button  className="px-7 py-3 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-white hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
//             VR Ready
//           </button>
//           </Link>
//         </div>
//       </div>
      
//     </main>
//   );
// }
// import Link from "next/link";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/homewallpaper.svg"
//           alt="background wallpaper"
//           layout="fill"
//           objectFit="cover"
//           className="w-full h-full"
//         />
//       </div>

      
//       <div className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 text-center">
       
//         <div className="flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-8 mb-12">
//           <Link href="/" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Home
            
//           </Link>
//           <Link href="/training" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Training
            
//           </Link>
//           <Link href="/quiz-mania" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Quiz Mania
            
//           </Link>
//           <Link href="/medical-test" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Medical Test
            
//           </Link>
//           <Link href="/certificate-page" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
          
//               Certificates
           
//           </Link>
//           <Link href="/button-6" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Button 6
            
//           </Link>
//         </div>

//         {/* Login and Register Buttons */}
//         <div className="flex gap-4 md:gap-6 lg:gap-8 mb-12">
//           <Link href="/login" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Login
            
//           </Link>
//           <Link href="/register" className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               Register
            
//           </Link>
//         </div>

//         {/* Logo and CTA Button */}
//         <div className="flex flex-col items-center justify-center mb-12">
//           <Image
//             src="/skylogo.svg"
//             alt="sky logo"
//             width={300}
//             height={300}
//             className="object-contain mb-6"
//           />
//           <Link href="/signup" className="px-6 py-3 text-sm md:text-base lg:text-lg bg-white text-gray-900 rounded-lg border-2 border-transparent hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
            
//               VR Ready
            
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homewallpaper.svg"
          alt="background wallpaper"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 text-center">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-12">
          <Link href="/" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Home
            </button>
          </Link>
          {/* <Link href="/training" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Training
            </button>
          </Link> */}
          <Link href="/quiz-mania" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Quiz Mania
            </button>
          </Link>
          {/* <Link href="/medical-test" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Medical Test
            </button>
          </Link> */}
          <Link href="/certificate-page" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Certificates
            </button>
          </Link>
          <Link href="/dashboard" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Dashboard
            </button>
          </Link>
        </div>

        <div className="flex gap-4 md:gap-6 lg:gap-8 mb-12">
          <Link href="/login" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Login
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Register
            </button>
          </Link>
        </div>

      
        <div className="flex flex-col items-center justify-center mb-12">
          <Image
            src="/skylogo.svg"
            alt="sky logo"
            width={300}
            height={300}
            className="object-contain mb-6"
          />
          <Link href="/dashboard" >
            <button className="px-6 py-3 text-sm md:text-base lg:text-lg bg-white text-gray-900 rounded-lg border-2 border-transparent hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
              VR Ready
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
