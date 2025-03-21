'use client'
import { useState } from 'react';

export default function PracticeMode() {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for demo

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Practice Mode</h1>
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <p className="text-xl font-semibold text-center mb-4">
          Time Left: {timeLeft} seconds
        </p>
        <p className="text-gray-700 text-center">
          Answer the questions under timed conditions. (Timer functionality to be implemented.)
        </p>
      </div>
    </div>
  );
}