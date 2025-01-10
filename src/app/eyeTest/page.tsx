"use client";
import { useState } from "react";

interface TestImage {
  url: string;
  answer: string;
}

export default function ColorBlindnessTest() {
  const [showIntro, setShowIntro] = useState(true);
  const [images] = useState<TestImage[]>([
    { url: "/number1.png", answer: "5" },
    { url: "/number2.png", answer: "8" },
    { url: "/number3.png", answer: "6" },
    { url: "/number4.png", answer: "4" },
    { url: "/number5.png", answer: "1" },
    { url: "/number6.png", answer: "6" },
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [testEnded, setTestEnded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const handleSubmit = (input: string) => {
    if (input === images[currentImageIndex].answer) {
      setScore(score + 1);
    }

    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setTestEnded(true);
      setShowPopup(true);
      setIsPassed(score + 1 > 3);
    }
  };

  const resetTest = () => {
    setTestEnded(false);
    setScore(0);
    setCurrentImageIndex(0);
    setShowPopup(false);
  };

  const startTest = () => {
    setShowIntro(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#081839] p-4">
      {showIntro ? (
        <div className="w-[70%] max-w-[70%] bg-[#212C44] rounded-lg p-6 shadow-lg flex mx-auto">
          <div className="w-1/2 h-full">
            <img src="/colorblind.webp" alt="Intro Image" className="w-full h-full object-cover rounded-l-lg" />
          </div>
          <div className="w-1/2 p-6 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get Ready To Take The Test</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Turn up your brightness to 100%.</li>
                <li>Be sure to turn off any blue light filter.</li>
                <li>You will have 7 seconds to respond to each test plate.</li>
                <li>Don’t wear tinted lenses during the test.</li>
                <li>Make sure you are using a laptop or PC screen.</li>
              </ul>
            </div>
            <button
              onClick={startTest}
              className="mt-6 px-16 py-3 bg-[#5AA0BC] text-white text-xl font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300 mx-auto"
            >
              Start Test
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[70%] max-w-[70%] bg-[#212C44] rounded-lg p-6 shadow-lg flex mx-auto relative">
          {!testEnded ? (
            <>
              <div className="w-1/2 pr-6">
                <img
                  src={images[currentImageIndex].url}
                  alt="Color blindness test"
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-1/2 flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Color Blindness Test</h2>
                <p className="text-white text-lg mb-4">Spot the number in the image and click the matching button.</p>
                <div className="grid grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(i.toString())}
                      className="px-6 py-4  bg-[#5AA0BC] text-white font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300"
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center">
              <h3 className="text-2xl font-semibold text-white">Test Completed!</h3>
              <p className="text-white text-xl mt-4">
                Your final score is {score} out of {images.length}.
              </p>
              <button
                onClick={resetTest}
                className="mt-6 px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300"
              >
                Try Again
              </button>
            </div>
          )}
          {showPopup && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {isPassed ? "Congratulations!" : "Test Failed"}
                </h3>
                <p className="text-lg text-gray-600 mt-4">
                  {isPassed
                    ? "You successfully passed the color blindness test."
                    : "You have failed. Please try again."}
                </p>
                <img
                  src={isPassed ? "/Pass.png" : "/Fail.png"}
                  alt={isPassed ? "Success" : "Failure"}
                  className="w-20 h-20 mt-4 mx-auto"
                />
                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
