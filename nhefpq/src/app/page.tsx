"use client"; // Add this directive at the top

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--heading-color)] mb-4">
        Welcome to the
        <br />
        <span className="block">NHEF-PQ App</span>
      </h1>
      <p className="text-md md:text-lg text-[var(--text-color)] max-w-2xl mb-6">
        Practice and review past test questions with ease, and boost your exam performance!
      </p>

      {/* Buttons for Question Bank and Practice Mode */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link href="/question-bank">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
            Go to Question Bank
          </button>
        </Link>
        <Link href="/practice">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
            Go to Practice Mode
          </button>
        </Link>
      </div>

      {/* Subscription Section */}
      <div className="mt-8 bg-[var(--heading-color)] p-6 rounded-lg shadow-lg text-white w-4/5 mx-auto md:w-full">
        <h2 className="text-xl font-extrabold mb-3 text-black">
          Found this app helpful?
        </h2>
        <p className="text-sm md:text-base mb-4 text-black">
          Please consider subscribing to my YouTube channel🥺🙏
        </p>
        <a
          href="https://www.youtube.com/@DevMarkson"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md shadow-md transition-all duration-300"
        >
          Subscribe on YouTube
        </a>
      </div>

      {/* Footer with Personalization */}
      <footer className="mt-8 text-sm text-white">
        <p className="mb-2">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/favour-markson/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold hover:text-gray-300 transition-colors duration-200"
          >
            Markson Favour
          </a>
        </p>
        <p className="mb-2">
          Tested by{" "}
          <a
            href="https://www.linkedin.com/in/philemon-oyedele/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold hover:text-gray-300 transition-colors duration-200"
          >
            Philemon Oyedele
          </a>
        </p>
        <p>With Love from U.I (Prospective 2025 NHEF Scholars)</p>
      </footer>
    </div>
  );
}