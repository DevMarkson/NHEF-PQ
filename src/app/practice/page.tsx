"use client";
import { useEffect, useState, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [availableTests, setAvailableTests] = useState<{ [key: string]: string[] }>({
    verbal: [],
    abstract: [],
    numerical: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(0); // 0 means "Auto"
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getInitialTime = (category: string, qCount: number) => {
    // Standard durations per question based on typical entrance exams
    const secondsPerQuestion = {
      numerical: 60, // 1 min per question
      verbal: 30,    // 30s per question
      abstract: 45,  // 45s per question
    };
    const rate = secondsPerQuestion[category as keyof typeof secondsPerQuestion] || 60;
    return qCount * rate;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = useCallback((option: string) => {
    if (userAnswers[currentQuestionIndex]) return;

    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  }, [currentQuestionIndex, userAnswers]);

  const jumpToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
    }
  }, [currentQuestionIndex]);

  // Timer logic - Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && !isFinished && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isActive && !isFinished) {
      // Auto-finish when time is up
      finishSession();
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isFinished, timer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedTest === "" || isFinished) return;

      const key = e.key.toLowerCase();
      if (['a', 'b', 'c', 'd'].includes(key)) {
        const idx = key.charCodeAt(0) - 97;
        const currentQ = questions[currentQuestionIndex];
        if (currentQ && currentQ.options[idx]) {
          handleSelectAnswer(currentQ.options[idx]);
        }
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questions, currentQuestionIndex, selectedTest, isFinished, handleSelectAnswer, handleNext, handlePrev]);

  const finishSession = () => {
    setIsFinished(true);
    setIsActive(false);
  };

  const restartSession = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    const initialTime = selectedDuration > 0 ? selectedDuration * 60 : getInitialTime(selectedCategory, questions.length);
    setTimer(initialTime);
    setIsActive(true);
    setIsFinished(false);
  };

  // Scroll to top when question changes
  useEffect(() => {
    if (selectedTest) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex, selectedTest]);

  useEffect(() => {
    // Fetch test section names for instant selection
    fetch("/api/questions?metadata=true")
      .then((res) => res.json())
      .then((data: string[]) => {
        const verbalTests = data.filter((test) => test.toLowerCase().includes("verbal"));
        const abstractTests = data.filter((test) => test.toLowerCase().includes("abstract"));
        const numericalTests = data.filter((test) => test.toLowerCase().includes("numerical"));
        setAvailableTests({ verbal: verbalTests, abstract: abstractTests, numerical: numericalTests });
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
    setQuestions([]);
  };

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const testName = event.target.value;
    setSelectedTest(testName);
    setCurrentQuestionIndex(0);

    if (testName) {
      setLoading(true);
      fetch(`/api/questions?section=${encodeURIComponent(testName)}`)
        .then(res => res.json())
        .then(data => {
          setQuestions(data);
          setLoading(false);
          setIsActive(true);
          const initialTime = selectedDuration > 0 ? selectedDuration * 60 : getInitialTime(selectedCategory, data.length);
          setTimer(initialTime);
          setUserAnswers({});
          setIsFinished(false);
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
    <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 min-h-screen">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Practice <span className="text-brand-500">Environment</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
          Simulate official NHEF assessments with our interactive practice suite.
        </p>
      </div>

      {/* Accuracy Notice */}
      <div className="mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
        <div className="glass p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Found an accuracy issue? For the highest precision, we recommend downloading the <span className="text-emerald-400 font-bold">DRAGNET Study Pack</span> updated for 2024.
            </p>
          </div>
          <a
            href="/api/download-dragnet"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover-lift"
          >
            Download Studypack
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Selection Area */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="glass p-6 rounded-lg border-white/5 shadow-sm">
          <label htmlFor="category-select" className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">
            Step 1: Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategorySelection}
            className="w-full bg-surface-200 border border-white/10 rounded-md px-4 py-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Select Area</option>
            <option value="verbal">Verbal</option>
            <option value="abstract">Abstract</option>
            <option value="numerical">Numerical</option>
          </select>
        </div>

        <div className={`glass p-6 rounded-lg border-white/5 shadow-sm transition-opacity duration-300 ${!selectedCategory ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <label htmlFor="duration-select" className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">
            Step 2: Duration
          </label>
          <select
            id="duration-select"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
            className="w-full bg-surface-200 border border-white/10 rounded-md px-4 py-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all cursor-pointer"
          >
            <option value="0">Auto (Calculated)</option>
            <option value="10">10 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
          </select>
        </div>

        <div className={`glass p-6 rounded-lg border-white/5 shadow-sm transition-opacity duration-300 ${!selectedCategory ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <label htmlFor="test-select" className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">
            Step 3: Test Bank
          </label>
          <select
            id="test-select"
            value={selectedTest}
            onChange={handleTestSelection}
            className="w-full bg-surface-200 border border-white/10 rounded-md px-4 py-3 text-text-primary text-sm focus:ring-1 focus:ring-brand-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Select Test</option>
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
      ) : isFinished ? (
        <div className="glass p-16 rounded-lg border-white/5 text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div>
            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">Session Complete</span>
            <h2 className="text-4xl font-bold text-white mt-8 mb-4">Performance Summary</h2>
            <p className="text-text-secondary text-lg">Detailed breakdown of your practice attempt for <span className="text-white font-semibold">{selectedTest}</span>.</p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-6 bg-white/[0.02] rounded-lg border border-white/5 shadow-sm">
              <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Accuracy</span>
              <span className="text-3xl font-mono font-bold text-brand-500">
                {Math.round((Object.entries(userAnswers).filter(([idx, ans]) => ans === questions[parseInt(idx)].answer).length / questions.length) * 100)}%
              </span>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-lg border border-white/5 shadow-sm">
              <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">{timer === 0 ? "Status" : "Remaining"}</span>
              <span className={`text-3xl font-mono font-bold ${timer === 0 ? "text-red-500" : "text-white"}`}>
                {timer === 0 ? "TIME EXPIRED" : formatTime(timer)}
              </span>
            </div>
            <div className="p-6 bg-white/[0.02] rounded-lg border border-white/5 shadow-sm">
              <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Attempted</span>
              <span className="text-3xl font-mono font-bold text-white">{Object.keys(userAnswers).length} / {questions.length}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-8">
            <button
              onClick={restartSession}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-md transition-all hover-lift active:scale-95 shadow-lg"
            >
              Re-attempt Test
            </button>
            <button
              onClick={() => setSelectedTest("")}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 glass text-text-secondary hover:text-white font-bold rounded-md transition-all hover-lift active:scale-95"
            >
              New Focus Area
            </button>
          </div>
        </div>
      ) : selectedTest === "" ? (
        <div className="glass p-20 rounded-lg text-center border-dashed border-white/5 border-[1px] opacity-60">
          <p className="text-sm text-text-muted italic max-w-xs mx-auto">Please configure your practice session parameters using the selection menus above to begin.</p>
        </div>
      ) : filteredQuestions.length > 0 ? (
        <div className="space-y-10">
          {/* Main Question Area */}
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Progress Header */}
            <div className="flex flex-col gap-4 bg-surface-200/50 p-6 rounded-lg border border-white/5 backdrop-blur-sm sticky top-4 z-20 shadow-lg mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em]">{selectedTest}</span>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Evaluation {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-3 px-4 py-2 bg-white/5 rounded-md border ${timer < 60 ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${timer < 60 ? 'text-red-500' : 'text-text-muted'}`}>{timer < 60 ? 'Hurry' : 'Time'}</span>
                  <span className={`text-xl font-mono font-bold leading-none ${timer < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{formatTime(timer)}</span>
                </div>
                </div>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-lg border-white/5 shadow-xl relative overflow-hidden min-h-[500px]">
              {/* Passage for Verbal */}
              {currentQuestion.passage && (
                <div className="mb-12 p-8 bg-surface-300/40 border-l-4 border-brand-500 rounded-lg text-text-primary text-base md:text-lg leading-loose font-normal shadow-inner backdrop-blur-md overflow-x-auto">
                  <span className="block not-italic text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4 opacity-70 whitespace-nowrap">Comprehension Passage:</span>
                  <div className="space-y-4">
                    {currentQuestion.passage.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Image for Abstract/Numerical */}
              {currentQuestion.image && (
                <div className="mb-12 relative w-full overflow-hidden rounded-lg border border-white/5 bg-black/20 p-2 shadow-inner">
                  <Image
                    src={currentQuestion.image}
                    alt={`Resource Visual ${currentQuestion.number}`}
                    width={800}
                    height={450}
                    layout="responsive"
                    className="rounded-md object-contain"
                    unoptimized={true}
                  />
                </div>
              )}

              <div className="space-y-4 mb-10">
                <span className="text-[10px] font-bold text-brand-400/60 uppercase tracking-widest">Question {currentQuestion.number}</span>
                <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-text-primary leading-tight tracking-tight">
                  {currentQuestion.content}
                </h2>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === option;
                  const isCorrect = option === currentQuestion.answer;
                  const hasAnswered = !!userAnswers[currentQuestionIndex];

                  let buttonStyles = "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] text-text-secondary";
                  if (hasAnswered) {
                    if (isSelected) {
                      buttonStyles = isCorrect
                        ? "bg-brand-500/15 border-brand-500/40 text-brand-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                        : "bg-red-500/15 border-red-500/40 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]";
                    } else {
                      buttonStyles = "opacity-40 border-white/5 text-text-muted cursor-default";
                      if (isCorrect) buttonStyles = "bg-brand-500/5 border-brand-500/20 text-brand-500/70 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full text-left p-6 rounded-lg border transition-all duration-300 font-medium text-sm flex items-center gap-5 ${buttonStyles} hover-lift group`}
                      disabled={hasAnswered}
                    >
                      <span className={`w-8 h-8 rounded-md flex items-center justify-center font-mono text-xs uppercase shrink-0 transition-colors ${isSelected ? 'bg-current text-surface-100' : 'bg-white/10 text-text-muted group-hover:bg-white/20'}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {hasAnswered && isCorrect && <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">Correct Answer</span>}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Explanation */}
              {userAnswers[currentQuestionIndex] && (
                <div className="mt-14 pt-10 border-t border-white/5 animate-in slide-in-from-bottom-6 duration-700">
                  <div className={`p-8 rounded-lg ${userAnswers[currentQuestionIndex] === currentQuestion.answer ? "bg-brand-500/5 border border-brand-500/10" : "bg-red-500/5 border border-red-500/10"}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-2 h-2 rounded-full ${userAnswers[currentQuestionIndex] === currentQuestion.answer ? "bg-brand-500 animate-pulse" : "bg-red-500"}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${userAnswers[currentQuestionIndex] === currentQuestion.answer ? "text-brand-500" : "text-red-500"}`}>
                        {userAnswers[currentQuestionIndex] === currentQuestion.answer ? "Conceptual Accuracy Achieved" : "Reasoning Reinforcement Required"}
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
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-6">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 glass text-text-secondary hover:text-white rounded-lg transition-all disabled:opacity-20 text-sm font-bold border-white/10 hover-lift"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Previous Evaluation
              </button>

              {currentQuestionIndex === filteredQuestions.length - 1 ? (
                <button
                  onClick={finishSession}
                  className="px-6 sm:px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-[0_8px_30px_rgb(16,185,129,0.3)] text-sm hover-lift"
                >
                  Finalize Preparation
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center gap-3 px-6 sm:px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-[0_8px_30px_rgb(16,185,129,0.3)] text-sm hover-lift"
                >
                  Continue Preparation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>

            {/* Repositioned Navigator Grid (Full Width Below) */}
            <div className="glass p-8 rounded-lg border-white/5 shadow-sm space-y-8 mt-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Question Navigator</h3>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">Jump to any evaluation in this test bank</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-brand-500/60" />
                    Answered
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    Pending
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {questions.map((_, idx) => {
                  const isAnswered = !!userAnswers[idx];
                  const isCurrent = currentQuestionIndex === idx;

                  let boxStyles = "bg-white/5 border-white/5 text-text-muted";
                  if (isCurrent) boxStyles = "bg-white/15 border-brand-500 text-white ring-1 ring-brand-500/50 scale-110 z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  else if (isAnswered) boxStyles = "bg-brand-500/20 border-brand-500/40 text-brand-500 hover:bg-brand-500/30";
                  else boxStyles += " hover:bg-white/10 hover:border-white/20";

                  return (
                    <button
                      key={idx}
                      onClick={() => jumpToQuestion(idx)}
                      className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border text-xs sm:text-sm font-bold transition-all ${boxStyles}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-12">
              <div className="p-8 rounded-lg bg-brand-500/5 border border-brand-500/10 hover-lift">
                <span className="block text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-3">Assessment Tips</span>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">Use keyboard shortcuts (A-D) to answer faster and (Arrows) to navigate between questions. Precision and speed are key to assessment success.</p>
              </div>
            </div>
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
