'use client'
import React from 'react'
import { useState, useEffect } from 'react';
export default function ReactionTimeTest() {
  const [isGreen, setIsGreen] = useState(false);
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number[]>([]);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [instruction, setInstruction] = useState("Wait for Green...");

  useEffect(() => {
    if (roundsCompleted < 5 && !isGreen) {
      const delay = Math.floor(Math.random() * 1000) + 5000;
      const timer = setTimeout(() => {
        setIsGreen(true);
        setInstruction("Click!");
        setTimerStart(performance.now());  // More precise timing
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [roundsCompleted, isGreen]);

  const handleClick = () => {
    if (isGreen && timerStart !== null) {
      const reactionTime = performance.now() - timerStart;  // More precise timing
      setTimeTaken((prev) => [...prev, reactionTime]);
      setRoundsCompleted((prev) => prev + 1);
      setIsGreen(false);
      setInstruction("Wait for Green...");
      setTimerStart(null);
    }
  };

  const averageTime =
    timeTaken.reduce((acc, time) => acc + time, 0) / timeTaken.length || 0;

  const resetTest = () => {
    setTimeTaken([]);
    setRoundsCompleted(0);
    setIsGreen(false);
    setInstruction("Wait for green...");
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-500 ${
        isGreen ? 'bg-green-500' : 'bg-red-500'
      } cursor-pointer`}
    >
      {roundsCompleted < 5 ? (
        <h2 className="text-4xl font-bold text-white">{instruction}</h2>
      ) : (
        <div className="text-center text-white">
          <p className="text-4xl font-bold mb-4">Average Reaction Time: {Math.round(averageTime)} ms</p>
          <button
            onClick={resetTest}
            className="px-6 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      )}
      {roundsCompleted > 0 && roundsCompleted < 5 && (
        <p className="absolute bottom-10 text-white text-xl">Reaction Time: {Math.round(timeTaken[roundsCompleted - 1])} ms</p>
      )}
    </div>
  );
}
