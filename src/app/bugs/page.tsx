"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Bug {
  _id: string;
  description: string;
  status: "pending" | "fixed";
  reply?: string;
  createdAt: string;
}

function BugTrackerContent() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  const [bugs, setBugs] = useState<Bug[]>([]);
  const [description, setDescription] = useState("");
  const [adminReply, setAdminReply] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const res = await fetch("/api/bugs");
      const data = await res.json();
      setBugs(data);
    } catch (err) {
      console.error("Failed to fetch bugs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFix = async (id: string) => {
    const reply = adminReply[id] || "Fixed";
    try {
      const res = await fetch(`/api/bugs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "fixed", reply }),
      });
      if (res.ok) fetchBugs();
    } catch (err) {
      console.error("Failed to fix bug", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (res.ok) {
        setDescription("");
        fetchBugs();
      }
    } catch (err) {
      console.error("Failed to report bug", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Notice a <span className="text-brand-500">Bug</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          Spotted something that isn&apos;t quite right? Report it here to help us build the perfect NHEF preparation tool.
        </p>
      </header>

      {/* Bug List - Moved Up */}
      <section className="mb-12 md:mb-16 space-y-6 md:space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-[0.2em]">Community Bug Feed</h2>
          <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest bg-brand-500/10 px-2 py-0.5 rounded">Check first</span>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 md:py-20 opacity-40">
            <p className="text-sm font-medium">Synchronizing status reports...</p>
          </div>
        ) : bugs.length === 0 ? (
          <div className="glass p-8 md:p-12 rounded-xl border-dashed border-white/10 text-center opacity-40">
            <p className="text-sm font-medium italic">No reported bugs. Everything is running smoothly.</p>
          </div>
        ) : (
          <div className="grid gap-2 md:gap-3">
            {bugs.map((bug) => (
              <div key={bug._id} className="glass p-3 md:p-5 rounded-xl border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-2 md:mb-4">
                  <div className="space-y-2 md:space-y-3 flex-1">
                    <p className="text-text-primary text-xs md:text-sm leading-relaxed font-medium">
                      {bug.description}
                    </p>
                    <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-bold text-text-muted uppercase tracking-widest">
                       <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                       <span className="w-1 h-1 rounded-full bg-white/20" />
                       <span>Anonymous User</span>
                    </div>
                  </div>
                  <div className={`shrink-0 w-fit px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest border ${
                    bug.status === "fixed" 
                    ? "bg-brand-500/10 border-brand-500/20 text-brand-500" 
                    : "bg-white/5 border-white/10 text-text-muted"
                  }`}>
                    {bug.status}
                  </div>
                </div>

                {bug.reply && (
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-500 animate-pulse" />
                      <span className="text-[9px] md:text-[10px] font-bold text-brand-500 uppercase tracking-widest">Developer Reply</span>
                    </div>
                    <p className="text-text-secondary text-xs md:text-sm italic font-normal">
                      &quot;{bug.reply}&quot;
                    </p>
                  </div>
                )}

                {isAdmin && bug.status === "pending" && (
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10 space-y-4">
                    <input
                      type="text"
                      placeholder="Enter reply..."
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-xs text-white"
                      value={adminReply[bug._id] || ""}
                      onChange={(e) => setAdminReply({ ...adminReply, [bug._id]: e.target.value })}
                    />
                    <button
                      onClick={() => handleFix(bug._id)}
                      className="px-4 py-2 bg-brand-500 text-white text-[9px] font-bold uppercase rounded-lg hover:bg-brand-600"
                    >
                      Mark as Fixed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12 md:mb-16" />

      {/* Report Form */}
      <section id="report-form">
        <div className="glass p-6 md:p-10 rounded-xl border-white/5 shadow-xl">
          <h2 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 md:mb-8">File a New Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue you encountered (e.g., 'Numerical Test 2 Question 5 has a typo')..."
              className="w-full h-28 md:h-32 bg-white/5 border border-white/10 rounded-lg p-5 md:p-6 text-white text-xs md:text-sm focus:outline-none focus:border-brand-500/50 transition-all placeholder:text-text-muted/50 resize-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white text-xs md:text-sm font-bold rounded-lg transition-all active:scale-[0.98] shadow-[0_8px_30px_rgb(16,185,129,0.1)] disabled:opacity-50"
            >
              {isSubmitting ? "Sychronizing..." : "Submit Bug Report"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function BugTracker() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center opacity-40">
        <p className="text-sm font-medium">Synchronizing status reports...</p>
      </div>
    }>
      <BugTrackerContent />
    </Suspense>
  );
}
