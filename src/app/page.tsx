import Link from "next/link";
import Image from "next/image";


export default function Home() {
 
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/homewallpaper.svg"
        alt="airplane logo"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto mt-1">
        <div className="flex flex-wrap justify-between gap-4 md:gap-6 lg:gap-8">
          <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Home
          </button>
          <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Training
          </button>
          <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Quiz Mania
          </button>
          <button className="flex-grow px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Medical Test
          </button>
          <Link href="/certificate-page"> <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Certificates
            </button>
            </Link>
          <button className="flex-grow px-2 px-4 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            Button 6
          </button>
          <div className="flex gap-4 md:gap-6 lg:gap-8">
          <Link href="/login"> <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Login
            </button>
            </Link>
            <button className="px-2 py-2 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-1/2 left-0 right-0 mx-auto flex flex-col items-center">
        <Image
          src="/skylogo.svg"
          alt="fancy s"
          width={400}  // Increased size
          height={400} // Increased size
          className="object-contain"
        />
        
        <div className="mt-8">
        <Link href="/signup">
          <button  className="px-7 py-3 text-sm md:text-base lg:text-lg bg-none text-white rounded-lg border-2 border-white hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
            VR Ready
          </button>
          </Link>
        </div>
      </div>
      
    </main>
  );
}
