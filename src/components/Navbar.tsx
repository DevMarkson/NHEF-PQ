"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path to highlight the active link

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/n-logo.svg"
            alt="N Logo"
            width={36}
            height={36}
            className="rounded-md shadow-sm transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-lg tracking-tight text-white hover:text-brand-500 transition-colors">
            NHEF<span className="text-brand-500"> PQ</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Question Bank", path: "/question-bank" },
            { name: "Practice Mode", path: "/practice" },
            { name: "Report a Bug", path: "/bugs" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${pathname === link.path ? "text-emerald-400" : "text-gray-300"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://mdv1bzkkj9z23omg.public.blob.vercel-storage.com/DRAGNET_studypack_updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-md transition-all border border-emerald-500/20 active:scale-[0.98] shadow-sm text-center"
          >
            Download Dragnet
          </a>
          <a
            href="https://www.youtube.com/watch?v=hhEamn4XlFw&t=223s"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-md transition-all active:scale-[0.98] shadow-sm text-center"
          >
            Video Guide
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all focus:outline-none active:scale-95"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-slate-950 border-b border-white/5 flex flex-col p-8 space-y-8 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest opacity-50">Navigation</span>
              {[
                { name: "Home", path: "/" },
                { name: "Question Bank", path: "/question-bank" },
                { name: "Practice Mode", path: "/practice" },
                { name: "Report a Bug", path: "/bugs" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-2xl font-bold tracking-tight transition-colors ${pathname === link.path ? "text-emerald-400" : "text-white"
                    }`}
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 space-y-6">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest opacity-50">Community</span>
              <a
                href="https://mdv1bzkkj9z23omg.public.blob.vercel-storage.com/DRAGNET_studypack_updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded-lg transition-all border border-emerald-500/20"
                onClick={handleLinkClick}
              >
                Download Dragnet PDF
              </a>
              <a
                href="https://www.youtube.com/watch?v=hhEamn4XlFw&t=223s"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-500/20"
                onClick={handleLinkClick}
              >
                Watch Assessment Guide
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

