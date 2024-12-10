'use client';
import { FaRegEye, FaBrain, FaRegClock } from 'react-icons/fa'; // Importing icons
import Link from 'next/link';

export default function TestSelection() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#081839]">
      <div className="flex space-x-8">
        {/* Reflex Test Card */}
        <div className="w-60 h-80 bg-[#212C44] rounded-lg shadow-lg hover:border-2 hover:border-[#5AA0BC] transition duration-100 ease-in-out cursor-pointer flex flex-col">
          <div className="flex justify-center mt-4">
            <FaRegClock className="text-6xl text-[#5AA0BC]" />
          </div>
          <hr className="border-t-2 border-[#5AA0BC] mx-12 my-2" />
          <div className="flex flex-col justify-between p-4 flex-1 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Reflex Test</h3>
              <p className="text-white text-sm mt-2">
                Test your reflexes by clicking a button when it turns green.
                Measure how fast you can react to stimuli.
              </p>
            </div>
            <div>
              <Link href="/reflexTest" className="block w-full px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300">
                Start Test
              </Link>
            </div>
          </div>
        </div>

        {/* Eye Test Card */}
        <div className="w-60 h-80 bg-[#212C44] rounded-lg shadow-lg hover:border-2 hover:border-[#5AA0BC] transition duration-100 ease-in-out cursor-pointer flex flex-col">
          <div className="flex justify-center mt-4">
            <FaRegEye className="text-6xl text-[#5AA0BC]" />
          </div>
          <hr className="border-t-2 border-[#5AA0BC] mx-12 my-2" />
          <div className="flex flex-col justify-between p-4 flex-1 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Eye Test</h3>
              <p className="text-white text-sm mt-2">
                Assess your eyesight by identifying letters or symbols from a
                distance. Check your vision accuracy.
              </p>
            </div>
            <div>
              <Link href="/eyeTest" className="block w-full px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300">
                Start Test
              </Link>
            </div>
          </div>
        </div>

        {/* Memory Test Card */}
        <div className="w-60 h-80 bg-[#212C44] rounded-lg shadow-lg hover:border-2 hover:border-[#5AA0BC] transition duration-100 ease-in-out cursor-pointer flex flex-col">
          <div className="flex justify-center mt-4">
            <FaBrain className="text-6xl text-[#5AA0BC]" />
          </div>
          <hr className="border-t-2 border-[#5AA0BC] mx-12 my-2" />
          <div className="flex flex-col justify-between p-4 flex-1 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Memory Test</h3>
              <p className="text-white text-sm mt-2">
                Challenge your memory by remembering and recalling specific
                patterns or sequences. Test your cognitive ability.
              </p>
            </div>
            <div>
              <Link href="/memoryTest" className="block w-full px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300">
                Start Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
