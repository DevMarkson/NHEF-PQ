import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import Image from "next/image";

export const metadata: Metadata = {
  title: "NHEF PQ - Assessment Resource Bank",
  description: "Curated collection of NHEF internship scholarship assessment questions and study tools.",
  icons: {
    icon: "/n-logo.svg",
    apple: "/n-logo.svg",
  },
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
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center space-x-3">
                <Image
                  src="/n-logo.svg"
                  alt="N Logo"
                  width={32}
                  height={32}
                  className="rounded-md shadow-sm"
                />
                <span className="font-bold text-white tracking-tight uppercase text-xs tracking-widest">NHEF PQ</span>
              </div>
              <p className="text-xs text-text-muted leading-loose">
                Created by <span className="text-white font-semibold">Favour Markson</span> (NHEF UI 2025 Scholar). 
                An interactive extraction of the shared PDF to empower future applicants with better preparation tools.
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center space-x-8">
                <a href="https://www.linkedin.com/in/favour-markson/" target="_blank" className="text-text-secondary hover:text-brand-500 transition-colors text-xs font-semibold">
                  LinkedIn
                </a>
                <a href="https://www.youtube.com/@DevMarkson" target="_blank" className="text-text-secondary hover:text-brand-500 transition-colors text-xs font-semibold">
                  YouTube Channel
                </a>
              </div>
              <p className="text-text-muted text-[10px] font-medium tracking-wide leading-relaxed max-w-xs md:text-right">
                If you find this resource helpful, please <span className="text-brand-500 font-bold">Subscribe to my YouTube channel</span>.
              </p>
              <p className="text-text-muted text-[10px] font-medium tracking-wide uppercase">
                &copy; {new Date().getFullYear()} Scholarship Preparation Hub. No Perfect Prep, Just Progress.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

