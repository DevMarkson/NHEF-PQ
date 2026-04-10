"use client";

import { useState } from "react";
import InterviewCard from "@/components/InterviewCard";


const interviewQuestions = [
  {
    category: "General",
    question: "Tell me about yourself / Introduce yourself.",
    answer: "Use the 'Past - Present - Future' framework.\n\n• Past: Briefly mention your academic background and a key early achievement.\n• Present: Highlight your current year, major, and a significant recent project or leadership role you hold.\n• Future: Explain your career aspirations and how they align with the NHEF program.\n\nExample: 'I am a 400-level Economics student at UI. Last summer, I interned at X where I developed Y... Currently, I lead the Finance Society... I am applied to NHEF because I want to bridge the gap between academic theory and practical investment banking...'",
    tips: "Focus on professional and academic achievements. Keep it under 2 minutes."
  },
  {
    category: "General",
    question: "Tell me your strengths and weaknesses.",
    answer: "• Strengths: Choose 2-3 that are relevant to a professional environment (e.g., analytical thinking, resilience, teamwork). Provide a brief example for one.\n• Weaknesses: Choose a real weakness that you are ACTIVELY working on. Avoid 'perfectionism.' Show self-awareness and the steps you've taken to improve (e.g., 'Initially, I struggled with delegating tasks because I wanted everything to be perfect, but now I use project management tools to trust my team better.')",
    tips: "The goal is to show growth and self-awareness."
  },
  {
    category: "General",
    question: "How do you manage your time and prioritize tasks?",
    answer: "Mention specific tools or methods.\n\n'I use a combination of the Eisenhower Matrix for prioritization and digital tools like Google Calendar or Notion for scheduling. Every morning, I identify my &quot;Big 3&quot; tasks that must be completed. When I was juggling exams and a research project, I used time-blocking to ensure both received dedicated focus...'",
    tips: "Consistency and having a system is what matters most here."
  },
  {
    category: "NHEF Specific",
    question: "What do you know about the NHEF and the Scholars Program?",
    answer: "The NHEF was founded to enhance the capacity of higher education institutions in Nigeria. The Scholars Program is their flagship initiative designed to 'develop the next generation of Nigerian leaders' by providing world-class training, mentorship, and internships at leading partner firms like Goldman Sachs, KPMG, and McKinsey.",
    tips: "Knowing the mission ('Sustaining high-quality higher education') is crucial."
  },
  {
    category: "NHEF Specific",
    question: "Why do you want to join the NHEF Program? Why should you be selected?",
    answer: "Focus on the alignment between your goals and NHEF's mission.\n\n'I want to join to gain exposure to global best practices and bridge the gap between my academic learning and industry standards. I should be selected because of my proven leadership in X and my commitment to applying my skills within the Nigerian ecosystem—a goal that directly matches NHEF's objective of national impact.'",
    tips: "Be specific about what you hope to contribute to the NHEF community."
  },
  {
    category: "NHEF Specific",
    question: "If selected, how will you apply your new skills and knowledge when you return to school?",
    answer: "Think 'Paying it Forward.'\n\n'Upon returning, I plan to organize knowledge-sharing sessions within my department. I will also mentor junior students on career readiness and use the network I've gained to facilitate industry-university collaborations where possible, ensuring the impact of the scholarship extends beyond me.'",
    tips: "NHEF loves scholars who foster community growth."
  },
  {
    category: "Behavioral",
    question: "Describe a time you demonstrated leadership or took initiative when a manager wasn't around.",
    answer: "Use STAR.\n\n'In my student organization, when our president was unavailable, we faced a sudden budget crisis for our annual event. I stepped up to coordinate an emergency meeting with the sponsors, successfully securing a 15% increase in funding...'",
    tips: "Initiative is about identifying a gap and filling it responsibly."
  },
  {
    category: "Behavioral",
    question: "A time when you worked in a team or with someone with a different personality type.",
    answer: "Focus on adaptation and empathy.\n\n'I worked with a team member who was very detail-oriented while I was more big-picture. Initially, we clashed on speed vs. accuracy. I scheduled a sit-down to align our workflows—I provided the vision, and they handled the final review stage. This synergy resulted in our team winning the X competition.'",
    tips: "Respect and result-orientation are the keys to this answer."
  },
  {
    category: "Behavioral",
    question: "A time you made a mistake or failed and how you handled it.",
    answer: "Focus on the resolution and the lesson.\n\n'I once misread a client's brief for a design project. As soon as I realized, I informed them immediately, worked overtime to provide three corrected versions, and offered a discount for the inconvenience. I now use a digital confirmation checklist for every new brief to avoid similar errors.'",
    tips: "Accountability is extremely attractive to interviewers."
  },
  {
    category: "Behavioral",
    question: "If you are to decide between two solutions, how will you decide?",
    answer: "Focus on data and impact.\n\n'I evaluate them against three criteria: Cost/Efficiency, Scalability, and Stakeholder Impact. I gather relevant data for both, consult with team members or mentors if needed, and choose the one that aligns best with our long-term goals while minimizing risk.'",
    tips: "A logical, structured decision-making process is better than just a &quot;gut feeling.&quot;"
  },
  {
    category: "Behavioral",
    question: "A time you exceeded expectations on a task.",
    answer: "Show that you went the extra mile.\n\n'I was tasked with compiling a simple research report. Beyond just gathering data, I created a visual dashboard that allowed the department to filter results by region. This saved the team roughly 5 hours of manual analysis every month.'",
    tips: "Quantify the value you added beyond the basic requirements."
  },
  {
    category: "Industry Specific",
    question: "How do you envision applying your NHEF experience toward your goal of becoming a top global software engineer?",
    answer: "Connect the soft/leadership skills of NHEF with the hard skills of Engineering.\n\n'While I build technical expertise in school, NHEF will provide the professional polishing—learning how to communicate technical decisions to business stakeholders and understanding the global scale of operations at firms like Goldman Sachs. This holistic perspective is what separates a coder from a world-class engineer.'",
    tips: "Show that you understand engineering isn't just about code; it's about business impact."
  }
];

export default function InterviewPrep() {
  const [activeRound, setActiveRound] = useState<'first' | 'final'>('first');

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-10 pb-24">
      {/* Hero */}
      <section className="mb-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-500 text-[10px] font-bold tracking-widest uppercase">
            Phase 2: The Interview Stage
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            NHEF <span className="text-brand-500">Interview Mastery</span> Guide
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Shortlisted for the interview? This is where you demonstrate your character and vision. Use these frameworks and common questions to prepare your narrative.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => setActiveRound('first')}
              className={`flex items-center px-5 py-2.5 rounded-lg border transition-all duration-300 ${
                activeRound === 'first' 
                ? 'bg-emerald-500/10 border-brand-500 text-white shadow-lg shadow-brand-500/10' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-3 ${activeRound === 'first' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`}></span>
              <span className="text-xs font-bold uppercase tracking-widest">First Round</span>
            </button>
            <button 
              onClick={() => setActiveRound('final')}
              className={`flex items-center px-5 py-2.5 rounded-lg border transition-all duration-300 ${
                activeRound === 'final' 
                ? 'bg-blue-500/10 border-blue-500/50 text-white shadow-lg shadow-blue-500/10' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-3 ${activeRound === 'final' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'}`}></span>
              <span className="text-xs font-bold uppercase tracking-widest">Final Round</span>
            </button>
          </div>
        </div>
        <div className="hidden lg:block w-72 h-72 bg-brand-500/10 rounded-full blur-[100px] absolute -right-20 top-40 -z-10"></div>
      </section>

      {/* Webinar Special Section */}
      <section className="relative overflow-hidden glass rounded-xl border-brand-500/10 bg-brand-500/5 mb-24 transition-all hover:border-brand-500/20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0 lg:gap-10">
          {/* Video Player */}
          <div className="w-full lg:w-3/5 aspect-video bg-black/40">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/7nGOKYFNpcI"
              title="NHEF Interview Webinar"
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
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4 block animate-pulse">Required Viewing first</span>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                Cracking the NHEF First Round of Interviews: What it Takes to Stand Out
              </h2>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                This session focused on preparing effectively for the first round of the NHEF Scholars Program interviews, sharing practical strategies on how to communicate confidently and stand out.
              </p>
              
              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 text-[11px] text-gray-400 text-left list-none">
                {[
                  "Intentionally present your best self",
                  "Prioritize clarity over speed",
                  "Rehearse but stay natural",
                  "Optimize your background & attire",
                  "Deep research on NHEF mission",
                  "Use the STAR method",
                  "Ask thoughtful questions"
                ].map((point, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-brand-500 mr-2 shrink-0"></span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://youtube.com/live/7nGOKYFNpcI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-500 font-semibold text-xs hover:underline"
              >
                Watch Full Webinar on YouTube <span className="ml-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Content */}
      {activeRound === 'first' ? (
        <>
          {/* Preparation Frameworks */}
          <section className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="glass p-8 rounded-xl border-white/5 relative overflow-hidden group hover:border-brand-500/30 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 mr-3 text-sm">01</span>
                The STAR Method
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Essential for behavioral questions like &quot;Tell me about a time you...&quot;
              </p>
              <ul className="space-y-4">
                {[
                  { label: "S", text: "Situation: Context of the event." },
                  { label: "T", text: "Task: The challenge you faced." },
                  { label: "A", text: "Action: The specific steps YOU took." },
                  { label: "R", text: "Result: The positive outcome achieved." }
                ].map((item) => (
                  <li key={item.label} className="flex items-start">
                    <span className="font-bold text-brand-500 mr-3 mt-0.5">{item.label}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-8 rounded-xl border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mr-3 text-sm">02</span>
                Past, Present, Future
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                The perfect framework for &quot;Tell me about yourself.&quot;
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-emerald-500/20 pl-4 py-1">
                  <p className="text-xs font-bold text-white uppercase mb-1">Past</p>
                  <p className="text-xs text-gray-400">Education, early passion, and key foundation.</p>
                </div>
                <div className="border-l-2 border-emerald-500/20 pl-4 py-1">
                  <p className="text-xs font-bold text-white uppercase mb-1">Present</p>
                  <p className="text-xs text-gray-400">Current degree, year, and recent accomplishments.</p>
                </div>
                <div className="border-l-2 border-emerald-500/20 pl-4 py-1">
                  <p className="text-xs font-bold text-white uppercase mb-1">Future</p>
                  <p className="text-xs text-gray-400">Career goals and why this scholarship is the next step.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation (Visual Only) */}
            <aside className="lg:w-1/4 space-y-8 hidden lg:block">
              <div className="sticky top-24">
                <h4 className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-6">Preparation Checklist</h4>
                <ul className="space-y-4">
                  {[
                    "Review your CV & Essay",
                    "Research Board of Directors",
                    "Know the Partner Firms",
                    "Prepare 3 success stories",
                    "Test your video setup",
                    "Prepare questions for them"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500/30 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-12 p-6 glass rounded-xl border-dashed border-white/10">
                  <p className="text-xs text-text-muted leading-relaxed italic">
                    &quot;The NHEF interview is as much about your fit for the partner firms as it is for the scholarship itself.&quot;
                  </p>
                  <p className="text-[10px] font-bold text-white uppercase mt-4">— Scholar Tip</p>
                </div>
              </div>
            </aside>

            {/* Questions Section */}
            <main className="flex-1">
              <div className="mb-10 flex flex-col items-center sm:flex-row sm:justify-between sm:items-end border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">High-Frequency Questions</h2>
                  <p className="text-sm text-text-muted">Click on a question to reveal the recommended strategy and sample answer.</p>
                </div>
                <div className="mt-4 sm:mt-0 px-3 py-1 bg-brand-500/10 text-brand-500 text-[10px] font-bold rounded border border-brand-500/20">
                  {interviewQuestions.length} QUESTIONS TOTAL
                </div>
              </div>

              <div className="grid gap-6">
                {interviewQuestions.map((iq, index) => (
                  <InterviewCard 
                    key={index}
                    question={iq.question}
                    answer={iq.answer}
                    category={iq.category}
                    tips={iq.tips}
                  />
                ))}
              </div>
            </main>
          </div>
          {/* Final Round CTA */}
          <div className="mt-24 p-8 md:p-12 glass rounded-2xl border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-transparent text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Selected for the Final Round?</h3>
            <p className="text-text-secondary text-sm md:text-base mb-8 max-w-xl mx-auto">
              If you&apos;ve received the invitation for the final selection stage, click below to access specialized insights and partner-firm specific interview preparation.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setActiveRound('final');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center gap-3 group"
              >
                Go to Final Round Prep
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="py-32 text-center glass rounded-3xl border-white/5 bg-gradient-to-b from-blue-500/5 to-transparent">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Final Round Preparation</h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto leading-relaxed">
            We are <span className="text-blue-400 font-semibold uppercase tracking-widest text-sm underline decoration-blue-500/30 underline-offset-4">still compiling</span> the critical practice questions and internal partner insights for the final selection stage.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <button 
              onClick={() => setActiveRound('first')}
              className="px-8 py-3 glass text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-all border-white/10"
            >
              Back to First Round
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
