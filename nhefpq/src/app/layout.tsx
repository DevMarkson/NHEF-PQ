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
      <body className="bg-[var(--background)] text-[var(--text-color)] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center">
          {children}
          <Analytics />
        </main>
        <footer className="bg-[var(--navbar-bg)] shadow text-center text-sm text-white p-4">
          &copy; {new Date().getFullYear()} NHEF-PQ App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
