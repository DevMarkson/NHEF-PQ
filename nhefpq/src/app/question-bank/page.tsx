"use client";
import { useEffect, useState } from "react";

interface Question {
  _id: string;
  number: string;
  content: string;
  options: string[];
  answer: string;
  explanation?: string;
  testSection: string;
  passage?: string;
  image?: string; // Add image for abstract reasoning questions
  rules?: string[]; // Add rules for abstract reasoning questions
}

interface Section {
  testSection: string;
  passage?: string;
  questions: Question[];
}

export default function QuestionBank() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<string>(""); // Track the selected test
  const [availableTests, setAvailableTests] = useState<string[]>([]); // List of available tests

  useEffect(() => {
    // Fetch all questions and group by testSection
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const groupedSections: { [key: string]: Section } = {};
        data.forEach((q: Question) => {
          if (!groupedSections[q.testSection]) {
            groupedSections[q.testSection] = {
              testSection: q.testSection,
              passage: q.passage,
              questions: [],
            };
          }
          groupedSections[q.testSection].questions.push(q);
        });

        const sectionsArray = Object.values(groupedSections);
        setSections(sectionsArray);
        setAvailableTests(sectionsArray.map((section) => section.testSection)); // Extract test names
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTest(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Question Bank</h1>
      {loading ? (
        <p className="text-gray-700 text-center">Loading questions...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Dropdown to select the test */}
          <div className="mb-6">
            <label htmlFor="test-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select a Test:
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
            sections
              .filter((section) => section.testSection === selectedTest)
              .map((section, sectionIdx) => (
                <div key={sectionIdx} className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2">{section.testSection}</h2>
                  {section.questions.map((q, questionIdx) => (
                    <div key={q._id} className="mb-4">
                      {/* Render passage if it exists */}
                      {q.passage && (
                        <blockquote className="italic bg-gray-200 p-3 md:p-4 rounded mb-4 text-gray-800">
                          {q.passage}
                        </blockquote>
                      )}
                      {/* Render image if it exists */}
                      {q.image && (
                        <img
                          src={q.image}
                          alt={`Question ${q.number}`}
                          className="w-full h-auto mb-4 rounded-md"
                        />
                      )}
                      <p className="font-semibold text-gray-800">{q.content}</p>
                      <ul className="list-disc pl-5 mt-2">
                        {q.options.map((option, idx) => (
                          <li key={idx} className="text-gray-700">{option}</li>
                        ))}
                      </ul>
                      <p className="text-green-600 font-medium mt-2">Answer: {q.answer}</p>
                      {/* Render rules if they exist */}
                      {q.rules && (
                        <div className="mt-2 text-gray-600">
                          <strong>Rules:</strong>
                          <ul className="list-disc pl-5">
                            {q.rules.map((rule, idx) => (
                              <li key={idx}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {q.explanation && (
                        <p className="text-gray-600 mt-2 italic">Explanation: {q.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p className="text-gray-700 text-center">Please select a test to view questions.</p>
          )}
        </div>
      )}
    </div>
  );
}
