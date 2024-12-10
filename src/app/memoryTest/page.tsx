'use client';
import { useState, useEffect } from 'react';

export default function MemoryTest() {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [displayedNumber, setDisplayedNumber] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(5);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const generateRandomNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit number
  };

  const startTest = () => {
    setIsTestStarted(true);
    setScore(0);
    setAttempts(0);
    setGameEnded(false);
    showNextNumber();
  };

  const showNextNumber = () => {
    const newNumber = generateRandomNumber();
    setDisplayedNumber(newNumber);
    setCurrentNumber(newNumber);
    setIsInputDisabled(true);
    setUserInput('');
    setTimer(5);

    let countdown = 5;
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setIsInputDisabled(false);
        setDisplayedNumber(''); // Clear the displayed number after countdown ends
      }
    }, 1000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    if (userInput === currentNumber) { // Compare with saved currentNumber
      setScore(score + 1);
    }
    setAttempts(attempts + 1);

    if (attempts < 4) {
      showNextNumber();
    } else {
      setGameEnded(true); // End the game after 5 attempts
    }
  };

  const resetGame = () => {
    setGameEnded(false);
    setScore(0);
    setAttempts(0);
    setIsTestStarted(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#081839] p-4">
      <div className="w-full max-w-md bg-[#212C44] rounded-lg p-6 text-center shadow-lg">
        {!isTestStarted ? (
          <>
            <h2 className="text-2xl font-semibold text-white">Memory Test</h2>
            <p className="text-white text-lg mt-4">
              Are you ready to test your memory? Click the button below to start!
            </p>
            <button
              onClick={startTest}
              className="mt-6 px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300"
            >
              Start Test
            </button>
          </>
        ) : gameEnded ? (
          <>
            <h3 className="text-2xl font-semibold text-white">Test Over!</h3>
            <p className="text-white text-xl mt-4">Your final score is {score}.</p>
            <p className="text-white text-lg mt-4">You attempted {attempts}/5 times.</p>
            <button
              onClick={resetGame}
              className="mt-6 px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-white">Memory Test</h3>
            <p className="text-white text-xl mt-4">
              Memorize the number shown for {timer} seconds.
            </p>
            <div className="text-4xl text-[#5AA0BC] font-semibold my-4">
              {displayedNumber || "Get Ready!"}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={isInputDisabled}
              className="w-full p-2 text-lg text-black rounded-lg my-4 focus:outline-none"
              placeholder="Enter the number you saw"
            />
            <button
              onClick={handleSubmit}
              disabled={isInputDisabled}
              className="mt-4 px-6 py-2 bg-[#5AA0BC] text-white text-lg font-semibold rounded-lg hover:bg-[#4b8c9a] transition duration-300 disabled:opacity-50"
            >
              Submit
            </button>
            <p className="text-white mt-4">
              Score: {score} | Attempts: {attempts + 1}/5
            </p>
          </>
        )}
      </div>
    </div>
  );
}
