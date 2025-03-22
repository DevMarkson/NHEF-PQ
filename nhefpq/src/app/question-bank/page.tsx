'use client'
import { useEffect, useState } from 'react';

interface Question {
  _id: string;
  testSection: string;
  passage: string;
  number: string;
  content: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Question Bank</h1>
      {questions.length === 0 ? (
        <p className="text-gray-700 text-center">Loading questions...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {questions.map((question) => (
            <div key={question._id} className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2">{question.testSection}</h2>
              {question.passage && (
                <blockquote className="italic bg-gray-200 p-3 md:p-4 rounded mb-4 text-gray-800">
                  {question.passage}
                </blockquote>
              )}
              <p className="font-semibold text-gray-800 text-sm md:text-base">{question.content}</p>
              <ul className="list-disc pl-5 mt-2">
                {question.options.map((option, idx) => (
                  <li key={idx} className="text-gray-700 text-sm md:text-base">{option}</li>
                ))}
              </ul>
              <p className="text-green-600 font-medium mt-2">Answer: {question.answer}</p>
              <p className="text-gray-600 mt-1 text-xs md:text-sm">{question.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
