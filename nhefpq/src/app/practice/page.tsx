'use client'
import { useState } from 'react';

export default function PracticeMode() {
  const [timeLeft] = useState(60); // Removed setTimeLeft since it's unused

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Practice Mode</h1>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full max-w-md">
        <p className="text-lg font-semibold text-center mb-4">Time Left: {timeLeft} seconds</p>
      </div>
    </div>
  );
}
