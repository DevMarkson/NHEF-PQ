"use client";
import { useEffect, useState } from "react";

interface Question {
  _id: string;
  number: string;
  content: string;
  options: string[];
  answer: string;
  explanation?: string;
  passage?: string;
  testSection: string;
}

export default function PracticeMode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableTests, setAvailableTests] = useState<string[]>([]); // List of available tests
  const [selectedTest, setSelectedTest] = useState<string>(""); // Track the selected test

  useEffect(() => {
    // Fetch all questions and group by testSection
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const groupedSections: { [key: string]: Question[] } = {};
        data.forEach((q: Question) => {
          if (!groupedSections[q.testSection]) {
            groupedSections[q.testSection] = [];
          }
          groupedSections[q.testSection].push(q);
        });

        setQuestions(data);
        setAvailableTests(Object.keys(groupedSections)); // Extract test names
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTest(event.target.value);
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedAnswer(null); // Reset selected answer
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) {
    return <p className="text-gray-700 text-center">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-gray-700 text-center">No questions available for practice.</p>;
  }

  // Filter questions based on the selected test
  const filteredQuestions = questions.filter(
    (q) => q.testSection === selectedTest
  );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4">
        Practice Mode
      </h1>

      {/* Dropdown to select the verbal reasoning test */}
      <div className="mb-6">
        <label
          htmlFor="test-select"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select a Verbal Reasoning Test:
        </label>
        <select
          id="test-select"
          value={selectedTest}
          onChange={handleTestSelection}
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
        >
          <option value="">-- Select a Test --</option>
          {availableTests.map((test, idx) => (
            <option key={idx} value={test}>
              {test}
            </option>
          ))}
        </select>
      </div>

      {/* Display questions for the selected test */}
      {selectedTest ? (
        filteredQuestions.length > 0 ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl w-full">
            {/* Display the passage if it exists */}
            {currentQuestion.passage && (
              <blockquote className="italic bg-gray-200 p-4 rounded mb-4 text-gray-800">
                {currentQuestion.passage}
              </blockquote>
            )}
            <p className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestion.number}. {currentQuestion.content}
            </p>
            <ul className="list-none space-y-2">
              {currentQuestion.options.map((option, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-2 rounded-md border ${
                      selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? "bg-green-500 text-white" // Correct answer
                          : "bg-red-500 text-white" // Incorrect answer
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                    disabled={!!selectedAnswer} // Disable buttons after an answer is selected
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {selectedAnswer && (
              <div className="mt-4 text-gray-700">
                <p>
                  <strong>Your Answer:</strong> {selectedAnswer}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {currentQuestion.answer}
                </p>
                {currentQuestion.explanation && (
                  <p className="mt-2 italic">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">
            No questions available for the selected test.
          </p>
        )
      ) : (
        <p className="text-gray-700 text-center">
          Please select a test to start practicing.
        </p>
      )}
    </div>
  );
}
