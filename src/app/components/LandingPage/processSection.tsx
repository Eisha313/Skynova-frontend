
import Image from 'next/image';

const ProcessSection = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center mt-20'>
          {/* Heading Section */}
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-10">Why Us</h2>
          
          {/* Content Section */}
          <section className="flex flex-col md:flex-row items-center justify-center py-10 md:py-20">
            <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
              <Image
                src="/aviatorPointing.png"
                alt="Person pointing"
                width={400}  
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
    
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 text-center md:text-left">
                We ensure that your learning curve will improve with Us.
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-1 bg-eisha"></div>
    
                {/* Step 1 */}
                <div className="flex items-center space-x-4 relative">
                  <div className="w-10 h-10 bg-eisha text-white rounded-full flex justify-center items-center font-semibold">
                    01
                  </div>
                  <div className="p-4 border border-eisha rounded-lg shadow-md w-full">
                    <h3 className="font-bold text-lg text-gray-700">Competency Evaluation</h3>
                    <p className="text-gray-600">
                      Initial competency evaluation to help clear ambiguities regarding your eligibility.
                    </p>
                  </div>
                </div>
    
                {/* Step 2 */}
                <div className="flex items-center space-x-4 mt-8 relative">
                  <div className="w-10 h-10 bg-eisha text-white rounded-full flex justify-center items-center font-semibold">
                    02
                  </div>
                  <div className="p-4 border border-eisha rounded-lg shadow-md w-full">
                    <h3 className="font-bold text-lg text-gray-700">3D Visualization</h3>
                    <p className="text-gray-600">
                      3D Visualization of cockpits and jets to create an immersive experience.
                    </p>
                  </div>
                </div>
    
                {/* Step 3 */}
                <div className="flex items-center space-x-4 mt-8 relative">
                  <div className="w-10 h-10 bg-eisha text-white rounded-full flex justify-center items-center font-semibold">
                    03
                  </div>
                  <div className="p-4 border border-eisha rounded-lg shadow-md w-full">
                    <h3 className="font-bold text-lg text-gray-700">Learning Material</h3>
                    <p className="text-gray-600">
                      Learning through videos, books, and PDFs to help grasp concepts better in a clearer manner.
                    </p>
                  </div>
                </div>
    
                {/* Step 4 */}
                <div className="flex items-center space-x-4 mt-8 relative">
                  <div className="w-10 h-10 bg-eisha text-white rounded-full flex justify-center items-center font-semibold">
                    04
                  </div>
                  <div className="p-4 border border-eisha rounded-lg shadow-md w-full">
                    <h3 className="font-bold text-lg text-gray-700">Quizzes and Missions</h3>
                    <p className="text-gray-600">
                      Quizzes and missions to track the learning curve. Vital for improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };
 


export default ProcessSection;
