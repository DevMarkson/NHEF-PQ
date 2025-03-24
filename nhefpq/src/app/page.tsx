"use client"; // Add this directive at the top

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [subscribed, setSubscribed] = useState(false); // Track subscription status

  useEffect(() => {
    if (!subscribed) {
      // Show SweetAlert popup when the page loads
      Swal.fire({
        title: "Subscribe to Access",
        text: "Please subscribe to my YouTube channel to access the Question Bank and Practice Mode.",
        icon: "info",
        confirmButtonText: "Go to YouTube",
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing with the Escape key
        showCancelButton: false, // Remove the cancel button
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to YouTube channel
          window.open("https://www.youtube.com/@DevMarkson", "_blank");
          setSubscribed(true); // Mark as subscribed
        }
      });
    }
  }, [subscribed]);

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
      {subscribed && (
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
      )}

      {/* Footer with Personalization */}
      <footer className="mt-8 text-sm text-white">
        Developed by <strong>Markson Anietie Favour</strong>, Tested by <strong>Philemon Oyedele</strong>, With Love from U.I (Prospective 2025 NHEF Scholars)
      </footer>
    </div>
  );
}
