"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component

interface Question {
  _id: string;
  number: string;
  content: string;
  options: string[];
  answer: string;
  explanation?: string;
  testSection: string;
  passage?: string;
  image?: string; // Image for abstract reasoning questions
  rules?: string[]; // Rules for abstract reasoning questions
}

interface Section {
  testSection: string;
  passage?: string;
  questions: Question[];
}

export default function QuestionBank() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableTests, setAvailableTests] = useState<{ [key: string]: string[] }>({
    verbal: [],
    abstract: [],
    numerical: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTest, setSelectedTest] = useState<string>("");

  useEffect(() => {
    // Fetch only test section names initially for speed
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
    setSections([]); // Clear previous results
  };

  const handleTestSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const testName = event.target.value;
    setSelectedTest(testName);

    if (testName) {
      setLoading(true);
      fetch(`/api/questions?section=${encodeURIComponent(testName)}`)
        .then(res => res.json())
        .then(data => {
          const section: Section = {
            testSection: testName,
            questions: data
          };
          setSections([section]);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch section questions", err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24 min-h-screen">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Preparation <span className="text-brand-500">Resource Bank</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
          Master the NHEF scholarship application with our curated archive of examination questions.
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

      <div className="space-y-16">
        {/* Filter Area - Always visible for UX consistency */}
        <div className="grid md:grid-cols-2 gap-8">
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
              <option value="numerical">Numerical Reasoning</option>
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
              {selectedCategory && availableTests[selectedCategory].map((test, idx) => (
                <option key={idx} value={test}>
                  {test}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-10 rounded-lg border-white/5 animate-pulse">
                <div className="flex items-start gap-8">
                  <div className="w-10 h-10 rounded-md bg-white/5 shrink-0" />
                  <div className="flex-grow space-y-6">
                    <div className="h-6 bg-white/5 rounded-md w-3/4" />
                    <div className="h-20 bg-white/5 rounded-md w-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-12 bg-white/5 rounded-md" />
                      <div className="h-12 bg-white/5 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedTest ? (
          <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
              <h2 className="w-fit text-xs font-bold text-text-muted uppercase tracking-[0.3em] bg-white/5 px-5 py-2 rounded-full border border-white/5">
                Current Section: <span className="text-brand-500">{selectedTest}</span>
              </h2>
              <div className="hidden sm:block h-px flex-grow bg-white/5"></div>
            </div>

            {sections
              .filter((section) => section.testSection === selectedTest)
              .map((section) => (
                <div key={section.testSection} className="space-y-8">
                  {section.questions.map((q, qIdx) => (
                    <div key={q._id} className="glass p-10 md:p-12 rounded-lg border-white/5 hover:border-brand-500/10 transition-all hover:bg-white/[0.01] shadow-sm group">
                      <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-10 h-10 rounded-md bg-brand-500/5 border border-brand-500/10 flex items-center justify-center font-bold text-brand-500 shrink-0 text-sm">
                          {qIdx + 1}
                        </div>

                        <div className="flex-grow space-y-8">
                          <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
                              {q.content}
                            </h3>
                          </div>

                          {q.passage && (
                            <div className="bg-surface-300/40 p-8 rounded-lg border-l-4 border-brand-500 text-text-primary text-base md:text-lg leading-loose font-normal shadow-inner backdrop-blur-sm mt-8 overflow-x-auto">
                              <span className="block text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4 opacity-70 whitespace-nowrap">Comprehension Passage:</span>
                              <div className="space-y-4">
                                {q.passage.split('\n').map((para, i) => (
                                  <p key={i}>{para}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          {q.image && (
                            <div className="relative w-full max-w-2xl overflow-hidden rounded-md border border-white/5 bg-white/[0.02] p-2">
                              <Image
                                src={q.image}
                                alt={`Evaluation Visual ${q.number}`}
                                width={800}
                                height={450}
                                layout="responsive"
                                className="rounded-sm"
                                unoptimized={true}
                              />
                            </div>
                          )}

                          <div className="grid sm:grid-cols-2 gap-4">
                            {q.options.map((option, idx) => (
                              <div key={idx} className="flex items-center gap-4 p-4 rounded-md bg-white/[0.02] border border-white/5 text-text-secondary transition-colors group-hover:border-white/10 text-sm">
                                <span className="w-6 h-6 rounded bg-white/5 flex items-center justify-center font-mono text-[10px] uppercase text-text-muted">{String.fromCharCode(65 + idx)}</span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6 border-t border-white/5">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-brand-500/5 border border-brand-500/10">
                              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Answer</span>
                              <span className="font-bold text-white text-sm">{q.answer}</span>
                            </div>

                            {q.explanation && (
                              <div className="flex-1 md:max-w-md">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 underline decoration-brand-500/30">Logic Basis</p>
                                <p className="text-sm text-text-secondary leading-relaxed font-normal italic">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ) : (
          <div className="glass p-24 rounded-lg text-center border-dashed border-white/5 border-[1px] opacity-60">
            <h3 className="text-lg font-semibold text-text-muted mb-3">Resource Vault Empty</h3>
            <p className="text-sm text-text-muted max-w-xs mx-auto">Select a category and examination from the navigation above to browse the preparation hub.</p>
          </div>
        )}
      </div>
    </div>
  );
}

