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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          Empowering Future Scholars with the <span className="text-brand-500">Ultimate Preparation Resource</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Access a comprehensive bank of questions and timed practice modes designed to help you excel in the NHEF scholarship application.
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

      {/* Video Guide Section */}
      <section className="relative overflow-hidden glass rounded-xl border-brand-500/10 bg-brand-500/5 mb-20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0 lg:gap-10">
          {/* Video Player */}
          <div className="w-full lg:w-3/5 aspect-video bg-black/40">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/hhEamn4XlFw?start=223"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-14 lg:pl-4 text-center lg:text-left flex-1">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4 block">Recommended Viewing</span>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-6">
                Cracking the NHEF Assessment: A Guide for Shortlisted Candidates
              </h2>
              <p className="text-text-secondary text-sm md:text-base mb-8 leading-relaxed">
                Watch this guide by <span className="text-white font-semibold">NHEF UI Scholars 2025</span> that focuses on preparing effectively for the NHEF aptitude test, breaking down the structure, expectations, and practical strategies needed to perform well.
              </p>
              <a
                href="https://www.youtube.com/watch?v=hhEamn4XlFw&t=223s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-500 font-semibold text-sm hover:underline"
              >
                Watch on YouTube <span className="ml-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-2 gap-8 mb-32">
        {[
          {
            title: "Question Bank",
            desc: "Browse through hundreds of curated examination questions from NHEF intake exams.",
            link: "/question-bank",
          },
          {
            title: "Practice Mode",
            desc: "Refine your speed and accuracy in a simulated, time-pressured environment.",
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

      {/* Scholar's Note & Disclaimer */}
      <section className="glass rounded-xl p-8 md:p-12 border-dashed border-white/10 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">A Note from the Creator</h3>
              <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Favour Markson • NHEF UI 2025 Scholar</p>
            </div>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base">
              <p>
                This platform was created to transform the static preparation PDF shared during my set into a truly interactive experience. By digitizing these resources, I hope to provide you with a faster, more effective way to prep.
              </p>
              <div className="bg-white/5 p-5 md:p-8 rounded-lg border-l-2 border-brand-500 italic text-sm">
                <p className="font-bold text-white not-italic mb-2 text-[10px] uppercase tracking-widest">Important Disclaimer</p>
                While this tool is designed to build your confidence and familiarity with the assessment style, there is no &quot;perfect&quot; preparation. Please note that the actual exam questions and answers may differ from those provided here. Use this resource to sharpen your logic and speed.
              </div>
              <p className="text-xs font-semibold text-text-muted">
                If you find this interactive tool helpful, I would be honored if you <span className="text-brand-500 font-bold tracking-tight text-brand-500 text-xs">Subscribe to my YouTube channel</span>. 
                You can also find the video by <span className="text-white font-semibold">NHEF UI Scholars</span> on how to crack the assessment there.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
