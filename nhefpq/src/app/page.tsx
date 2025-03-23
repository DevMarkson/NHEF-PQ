import Link from "next/link";

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
    </div>
  );
}
