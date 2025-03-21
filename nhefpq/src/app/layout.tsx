// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NHEF-PQ App",
  description: "Past question bank and practice app for NHEF-PQ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <header className="bg-gray-800 shadow">
          <nav className="container mx-auto p-4 flex justify-between items-center">
            <div className="font-bold text-xl text-white">NHEF-PQ App</div>
            <div className="space-x-4">
              <a href="/" className="text-white hover:text-gray-300">Home</a>
              <a href="/question-bank" className="text-white hover:text-gray-300">Question Bank</a>
              <a href="/practice" className="text-white hover:text-gray-300">Practice Mode</a>
              <a href="/profile" className="text-white hover:text-gray-300">Profile</a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 shadow mt-8">
          <div className="container mx-auto p-4 text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} NHEF-PQ App. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}