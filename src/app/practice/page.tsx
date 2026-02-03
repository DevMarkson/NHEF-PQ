"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTest, setSelectedTest] = useState<string>("");

  useEffect(() => {
    // Fetch test section names for instant selection
    fetch("/api/questions?metadata=true")
      .then((res) => res.json())
      .then((data: string[]) => {
        const verbalTests = data.filter((test) => test.toLowerCase().includes("verbal"));
        const abstractTests = data.filter((test) => test.toLowerCase().includes("abstract"));
        setAvailableTests({ verbal: verbalTests, abstract: abstractTests });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch metadata", err);
        setLoading(false);
      });
  }, []);

  const handleCategorySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedTest("");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuestions([]);
  };

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const testName = event.target.value;
    setSelectedTest(testName);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);

    if (testName) {
      setLoading(true);
      fetch(`/api/questions?section=${encodeURIComponent(testName)}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch practice questions", err);
          setLoading(false);
        });
    }
  };

  const filteredQuestions = questions;

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 min_h-screen">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Practice <span className="text-brand-500">Environment</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
          Simulate official NHEF assessments with our interactive practice suite.
        </p>
      </div>

      {/* Selection Area */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="glass p-8 rounded-lg border-white/5 shadow-sm">
          <label htmlFor="category-select" className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">
            Step 1: Focus Area
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategorySelection}
            className="w-full bg-surface-200 border border-white/10 rounded-md px-4 py-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="verbal">Verbal Reasoning</option>
            <option value="abstract">Abstract Reasoning</option>
          </select>
        </div>

        <div className={`glass p-8 rounded-lg border-white/5 shadow-sm transition-opacity duration-300 ${!selectedCategory ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <label htmlFor="test-select" className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">
            Step 2: Specific Test
          </label>
          <select
            id="test-select"
            value={selectedTest}
            onChange={handleTestSelection}
            disabled={!selectedCategory}
            className="w-full bg-surface-200 border border-white/10 rounded-md px-4 py-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Select Examination</option>
            {selectedCategory && availableTests[selectedCategory].map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        /* Skeleton Simulation */
        <div className="glass p-10 rounded-lg border-white/5 animate-pulse min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-4 bg-white/5 rounded w-32" />
          </div>
          <div className="space-y-6 pt-4">
            <div className="h-8 bg-white/5 rounded w-3/4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-white/5 rounded" />)}
            </div>
          </div>
        </div>
      ) : selectedTest === "" ? (
        <div className="glass p-20 rounded-lg text-center border-dashed border-white/5 border-[1px] opacity-60">
          <p className="text-sm text-text-muted italic max-w-xs mx-auto">Please configure your practice session parameters using the selection menus above to begin.</p>
        </div>
      ) : filteredQuestions.length > 0 ? (
        <div className="space-y-10 animate-in fade-in duration-500">
          {/* Progress Header */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em]">Session Progress: {currentQuestionIndex + 1} / {filteredQuestions.length}</span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-3 py-1 rounded bg-white/5 border border-white/5">{selectedTest}</span>
          </div>

          <div className="glass p-10 md:p-14 rounded-lg border-white/5 shadow-sm relative overflow-hidden">
            {/* Passage for Verbal */}
            {currentQuestion.passage && (
              <div className="mb-12 p-6 bg-surface-300/30 border-l-2 border-brand-500 rounded-md text-text-secondary text-sm leading-relaxed italic font-normal">
                <span className="block not-italic text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2">Contextual Reference:</span>
                {currentQuestion.passage}
              </div>
            )}

            {/* Image for Abstract */}
            {currentQuestion.image && (
              <div className="mb-12 flex justify-center p-6 bg-white/[0.02] rounded-md border border-white/5">
                <Image
                  src={currentQuestion.image}
                  alt={`Question Visualization ${currentQuestion.number}`}
                  width={320}
                  height={320}
                  className="max-h-[320px] object-contain rounded-sm"
                />
              </div>
            )}

            {/* Question Content */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed max-w-3xl">
              {currentQuestion.number}. {currentQuestion.content}
            </h2>

            {/* Options */}
            <div className="grid gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.answer;

                let buttonStyles = "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] text-text-secondary";
                if (selectedAnswer) {
                  if (isSelected) {
                    buttonStyles = isCorrect
                      ? "bg-brand-500/10 border-brand-500/40 text-brand-500 shadow-sm"
                      : "bg-red-500/10 border-red-500/40 text-red-500 shadow-sm";
                  } else {
                    buttonStyles = "opacity-40 border-white/5 text-text-muted cursor-default";
                    if (isCorrect) buttonStyles = "bg-brand-500/5 border-brand-500/20 text-brand-500/70 cursor-default";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !selectedAnswer && setSelectedAnswer(option)}
                    className={`w-full text-left p-5 rounded-md border transition-all duration-300 font-medium text-sm flex items-center gap-5 ${buttonStyles}`}
                    disabled={!!selectedAnswer}
                  >
                    <span className="w-6 h-6 rounded bg-black/20 flex items-center justify-center font-mono text-[10px] uppercase shrink-0 opacity-60">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {selectedAnswer && isCorrect && <span className="text-[10px] font-bold uppercase tracking-widest">Correct Answer</span>}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {selectedAnswer && (
              <div className="mt-14 pt-10 border-t border-white/5 animate-in slide-in-from-bottom-4 duration-500">
                <div className={`p-8 rounded-md ${selectedAnswer === currentQuestion.answer ? "bg-brand-500/5 border border-brand-500/10" : "bg-red-500/5 border border-red-500/10"}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${selectedAnswer === currentQuestion.answer ? "text-brand-500" : "text-red-500"}`}>
                      {selectedAnswer === currentQuestion.answer ? "Success: Precision Achievement" : "Evaluation: Logic Analysis Required"}
                    </span>
                  </div>

                  {currentQuestion.explanation && (
                    <p className="text-text-secondary leading-relaxed text-sm font-normal italic">
                      &quot;{currentQuestion.explanation}&quot;
                    </p>
                  )}

                  {currentQuestion.rules && currentQuestion.rules.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {currentQuestion.rules.map((rule, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-text-muted font-medium">
                          {rule}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => {
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
                setSelectedAnswer(null);
              }}
              disabled={currentQuestionIndex === 0}
              className="px-8 py-3 glass text-text-secondary hover:text-white rounded-md transition-all disabled:opacity-20 text-sm font-semibold border-white/10"
            >
              Previous Evaluation
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
              }}
              disabled={currentQuestionIndex === filteredQuestions.length - 1}
              className="px-10 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-all active:scale-[0.98] shadow-sm disabled:opacity-20 text-sm"
            >
              Continue Preparation →
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 opacity-40">
          <p className="text-sm font-medium">Synchronizing examination data...</p>
        </div>
      )}
    </div>
  );
}
