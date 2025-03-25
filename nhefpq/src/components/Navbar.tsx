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
    <header className="bg-[var(--navbar-bg)] shadow">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="font-bold text-xl text-white">NHEF-PQ App</div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div
          className={`absolute top-16 left-0 w-full bg-[var(--navbar-bg)] text-white flex flex-col space-y-4 p-4 md:static md:flex-row md:space-x-6 md:p-0 md:w-auto ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link
            href="/"
            className={`hover:text-gray-300 ${
              pathname === "/" ? "text-green-300" : ""
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/question-bank"
            className={`hover:text-gray-300 ${
              pathname === "/question-bank" ? "text-green-300" : ""
            }`}
            onClick={handleLinkClick}
          >
            Question Bank
          </Link>
          <Link
            href="/practice"
            className={`hover:text-gray-300 ${
              pathname === "/practice" ? "text-green-300" : ""
            }`}
            onClick={handleLinkClick}
          >
            Practice Mode
          </Link>
          <a
            href="https://www.youtube.com/@DevMarkson"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Please subscribe to my YouTube 🙏
          </a>
        </div>
      </nav>
    </header>
  );
}
