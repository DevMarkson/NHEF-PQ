"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <img
            src="/n-logo.svg"
            alt="N Logo"
            className="w-9 h-9 rounded-md shadow-sm transition-transform group-hover:scale-105"
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
            href="https://www.youtube.com/@DevMarkson"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-md transition-all active:scale-[0.98] shadow-sm"
          >
            YouTube
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full glass bg-slate-900/95 border-b border-white/5 flex flex-col p-6 space-y-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {[
              { name: "Home", path: "/" },
              { name: "Question Bank", path: "/question-bank" },
              { name: "Practice Mode", path: "/practice" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-lg font-medium ${pathname === link.path ? "text-emerald-400" : "text-gray-300"
                  }`}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://www.youtube.com/@DevMarkson"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-3 bg-brand-500 text-white font-semibold rounded-md"
              onClick={handleLinkClick}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

