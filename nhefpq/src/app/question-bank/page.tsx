'use client'
import { useEffect, useState } from 'react';

interface Question {
  _id: string;
  content: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Dummy data for demonstration
    const dummyData: Question[] = [
      {
        _id: '1',
        content: 'What is the capital of France?',
        options: ['Paris', 'London', 'Rome', 'Berlin'],
        answer: 'Paris',
        explanation: 'Paris is the capital of France.',
      },
      {
        _id: '2',
        content: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4',
        explanation: '2 + 2 equals 4.',
      },
    ];
    setQuestions(dummyData);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Question Bank</h1>
      {questions.map((question) => (
        <div
          key={question._id}
          className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-lg transition"
        >
          <p className="font-semibold text-lg mb-2">{question.content}</p>
          <ul className="list-disc pl-5 mb-2">
            {question.options.map((option, idx) => (
              <li key={idx} className="text-gray-700">{option}</li>
            ))}
          </ul>
          <p className="text-green-600 font-medium">Answer: {question.answer}</p>
          <p className="text-sm text-gray-600 mt-1">
            Explanation: {question.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}