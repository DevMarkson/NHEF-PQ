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
}

interface Section {
  testSection: string;
  questions: Question[];
}

export default function QuestionBank() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        // Group questions by testSection
        const groupedSections: { [key: string]: Section } = {};
        data.forEach((q: Question) => {
          if (!groupedSections[q.testSection]) {
            groupedSections[q.testSection] = {
              testSection: q.testSection,
              questions: [],
            };
          }
          groupedSections[q.testSection].questions.push(q);
        });
        setSections(Object.values(groupedSections));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Question Bank</h1>
      {loading ? (
        <p className="text-gray-700 text-center">Loading questions...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2">{section.testSection}</h2>
              {section.questions.map((q, questionIdx) => {
                // Check if the passage changes and render it before the question
                const isFirstQuestion = questionIdx === 0;
                const previousPassage =
                  questionIdx > 0 ? section.questions[questionIdx - 1].passage : null;
                const shouldRenderPassage =
                  isFirstQuestion || q.passage !== previousPassage;

                return (
                  <div key={q._id} className="mb-4">
                    {shouldRenderPassage && q.passage && (
                      <blockquote className="italic bg-gray-200 p-3 md:p-4 rounded mb-4 text-gray-800">
                        {q.passage}
                      </blockquote>
                    )}
                    <p className="font-semibold text-gray-800">{q.content}</p>
                    <ul className="list-disc pl-5 mt-2">
                      {q.options.map((option, idx) => (
                        <li key={idx} className="text-gray-700">{option}</li>
                      ))}
                    </ul>
                    <p className="text-green-600 font-medium mt-2">Answer: {q.answer}</p>
                    {q.explanation && (
                      <p className="text-gray-600 mt-2 italic">Explanation: {q.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
