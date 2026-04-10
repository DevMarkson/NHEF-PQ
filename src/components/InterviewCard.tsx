"use client";
import { useState } from "react";

interface InterviewCardProps {
  question: string;
  answer: string;
  tips?: string;
  category?: string;
}

export default function InterviewCard({ question, answer, tips, category }: InterviewCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={`glass rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-brand-500/50 ${showAnswer ? 'shadow-lg shadow-brand-500/10' : ''}`}>
      <div className="p-6">
        {category && (
          <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-3 block opacity-80">
            {category}
          </span>
        )}
        <h3 className="text-lg font-bold text-white leading-tight mb-4">
          {question}
        </h3>
        
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            showAnswer ? 'text-brand-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{showAnswer ? "Hide Guide" : "Show Guide"}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showAnswer ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-expo ${
            showAnswer ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-6 pt-6 border-t border-white/5">
            <div>
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Sample High-Quality Approach
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
            </div>
            
            {tips && (
              <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/10">
                <h4 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2 flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Pro Tip
                </h4>
                <p className="text-xs text-brand-400/90 leading-relaxed italic">
                  {tips}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
