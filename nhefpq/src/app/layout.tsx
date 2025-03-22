import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the Client Navbar Component

export const metadata: Metadata = {
  title: "NHEF-PQ App",
  description: "Past question bank and practice app for NHEF-PQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar /> {/* Use the Client Navbar */}
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 shadow mt-8 text-center text-sm text-gray-300 p-4">
          &copy; {new Date().getFullYear()} NHEF-PQ App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
