"use client"; // This is now a Client Component

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="font-bold text-xl text-white">NHEF-PQ App</div>
        <div className="md:hidden">
          {/* Hamburger Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            ☰
          </button>
        </div>
        <div className={`absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col space-y-4 p-4 md:static md:flex-row md:space-x-6 md:p-0 md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/question-bank" className="hover:text-gray-300">Question Bank</a>
          <a href="/practice" className="hover:text-gray-300">Practice Mode</a>
        </div>
      </nav>
    </header>
  );
}
