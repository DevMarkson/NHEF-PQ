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
  image?: string;
  rules?: string[];
}

export default function PracticeMode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableTests, setAvailableTests] = useState<{ [key: string]: string[] }>({
    verbal: [],
    abstract: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Track selected category
  const [selectedTest, setSelectedTest] = useState<string>("");

  useEffect(() => {
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

        const verbalTests = Object.keys(groupedSections).filter((test) =>
          test.toLowerCase().includes("verbal")
        );
        const abstractTests = Object.keys(groupedSections).filter((test) =>
          test.toLowerCase().includes("abstract")
        );

        setQuestions(data);
        setAvailableTests({ verbal: verbalTests, abstract: abstractTests });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);

  const handleCategorySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedTest(""); // Reset the selected test when category changes
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  };

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTest(event.target.value);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  };

  const filteredQuestions = questions.filter(
    (q) => q.testSection === selectedTest
  );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white w-full">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4">
        Practice Mode
      </h1>

      {/* Category Selection */}
      <div className="mb-6">
        <label
          htmlFor="category-select"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select a Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategorySelection}
          className="p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">-- Select a Category --</option>
          <option value="verbal">Verbal Reasoning Tests</option>
          <option value="abstract">Abstract Reasoning Tests</option>
        </select>
      </div>

      {/* Test Selection */}
      {selectedCategory && (
        <div className="mb-6">
          <label
            htmlFor="test-select"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select a Test:
          </label>
          <select
            id="test-select"
            value={selectedTest}
            onChange={handleTestSelection}
            className="p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">-- Select a Test --</option>
            {availableTests[selectedCategory].map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <p className="text-gray-700 text-center">Loading questions...</p>
      ) : selectedTest === "" ? (
        // Display a message prompting the user to select a test
        <p className="text-gray-700 text-center">Please select a test to view questions..</p>
      ) : filteredQuestions.length > 0 ? (
        <div>
          {/* Display the passage for Verbal Reasoning Tests */}
          {currentQuestion.passage && (
            <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-100 text-left">
              <h3 className="text-lg font-semibold mb-2 text-black">Passage:</h3>
              <p className="text-black">{currentQuestion.passage}</p>
            </div>
          )}

          {/* Display the image for Abstract Reasoning Tests */}
          {currentQuestion.image && (
            <div className="mb-4">
              <img
                src={currentQuestion.image}
                alt={`Question ${currentQuestion.number}`}
                className="max-w-full h-auto border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Display the question text */}
          <p className="text-lg font-semibold mb-4 text-black">
            {currentQuestion.number}. {currentQuestion.content}
          </p>

          {/* Display the options */}
          <ul className="list-none space-y-2">
            {currentQuestion.options.map((option, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full text-left p-2 rounded-md border ${
                    selectedAnswer === option
                      ? option === currentQuestion.answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          {/* Display the answer explanation */}
          {selectedAnswer && (
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Your Answer:</strong> {selectedAnswer}
              </p>
              <p>
                <strong>Correct Answer:</strong> {currentQuestion.answer}
              </p>

              {/* Display the explanation for Verbal Reasoning Tests */}
              {currentQuestion.explanation && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Display the rules for Abstract Reasoning Tests */}
              {currentQuestion.rules && currentQuestion.rules.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Rules:</h3>
                  <ul className="list-disc list-inside text-left">
                    {currentQuestion.rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
                setSelectedAnswer(null); // Reset the selected answer
              }}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null); // Reset the selected answer
              }}
              disabled={currentQuestionIndex === filteredQuestions.length - 1}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Render nothing if no questions are available for the selected test
        <p className="text-gray-700 text-center"></p>
      )}
    </div>
  );
}
