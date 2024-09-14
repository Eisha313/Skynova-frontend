
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 overflow-hidden">
     
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
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-12">
          <Link href="/" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Home
            </button>
          </Link>
          
          <Link href="/quiz-mania" passHref>
            <button className="px-4 py-2 text-sm md:text-base lg:text-lg bg-transparent text-white rounded-lg border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-300">
              Quiz Mania
            </button>
          </Link>
         
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
          <Link href="/signup" passHref>
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
