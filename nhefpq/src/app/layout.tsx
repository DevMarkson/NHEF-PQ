import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "NHEF-PQ App",
  description: "Past question bank and practice app for NHEF-PQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen selection:bg-emerald-500/30">
        <Navbar />
        <main className="flex-grow pt-4">
          {children}
          <Analytics />
        </main>

        <footer className="w-full py-16 px-6 border-t border-white/5 bg-surface-200">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-500 rounded-md flex items-center justify-center font-bold text-white text-xs">N</div>
              <span className="font-bold text-white tracking-tight">NHEF PQ</span>
            </div>

            <p className="text-text-muted text-[11px] font-medium tracking-wide uppercase">
              &copy; {new Date().getFullYear()} Scholarship Preparation Hub. Professional Excellence Inspired.
            </p>

            <div className="flex items-center space-x-8">
              <a href="https://www.youtube.com/@DevMarkson" target="_blank" className="text-text-secondary hover:text-brand-500 transition-colors text-xs font-semibold">
                LinkedIn
              </a>
              <a href="https://www.youtube.com/@DevMarkson" target="_blank" className="text-text-secondary hover:text-brand-500 transition-colors text-xs font-semibold">
                Resources
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

