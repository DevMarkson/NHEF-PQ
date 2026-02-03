"use client"; // Add this directive at the top

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-8 pb-12 md:pt-14 md:pb-24">
      {/* Hero Section */}
      <section className="text-center space-y-10 mb-32 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-500 text-xs font-semibold tracking-wide uppercase mb-4">
          NHEF Assessment Preparation
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          Empowering Future Scholars with the <span className="text-brand-500">Ultimate Preparation Resource</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Access a comprehensive bank of past questions and timed practice modes designed to help you excel in the NHEF scholarship application.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-8">
          <Link href="/practice" className="w-full sm:w-auto">
            <button className="w-full sm:px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-all active:scale-[0.98] shadow-sm">
              Start Practice
            </button>
          </Link>
          <Link href="/question-bank" className="w-full sm:w-auto">
            <button className="w-full sm:px-10 py-4 glass text-white font-semibold rounded-md transition-all hover:bg-white/5 border-white/10 active:scale-[0.98]">
              Browse Questions
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-32">
        {[
          {
            title: "Question Bank",
            desc: "Browse through hundreds of curated past questions from previous NHEF intake exams.",
            link: "/question-bank",
          },
          {
            title: "Practice Mode",
            desc: "Refine your speed and accuracy in a simulated, time-pressured environment.",
            link: "/practice",
          },
          {
            title: "Detailed Logic",
            desc: "Master the underlying principles with comprehensive explanations for every solution.",
            link: "/practice",
          }
        ].map((item, i) => (
          <div key={i} className="glass p-10 rounded-lg border-white/5 hover-lift transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              {item.desc}
            </p>
            <Link href={item.link} className="text-brand-500 font-semibold text-sm hover:underline inline-flex items-center">
              Explore Section <span className="ml-2">→</span>
            </Link>
          </div>
        ))}
      </section>

      {/* Subscription Card */}
      <section className="relative overflow-hidden glass rounded-xl p-10 md:p-14 border-brand-500/10 bg-brand-500/5">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Accelerate Your Journey
            </h2>
            <p className="text-text-secondary md:text-lg mb-0 leading-relaxed">
              Join our community of scholars for deep-dive tutorials, scholarship tips, and regular platform updates on our YouTube channel.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@DevMarkson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 px-12 rounded-md transition-all active:scale-[0.98] shadow-sm"
          >
            Join Community
          </a>
        </div>
      </section>

    </div>
  );
}
