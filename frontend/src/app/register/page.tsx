"use client";
import Link from "next/link";

export default function RegisterIndex() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#DFF2E8] to-[#BCE2D0] p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#2E5D4D] mb-4">
          Join CITTAA MindBridge™
        </h1>
        <p className="text-gray-600 mb-10">
          Choose your role to start your journey and access personalized features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* School Card */}
          <Link
            href="/register/school"
            className="group flex flex-col items-center justify-center p-8 bg-[#F0F5F2] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4 p-4 bg-[#BCE2D0] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#2E5D4D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.558V18l-9 5-9-5v-5.442a12.083 12.083 0 012.84-1.98L12 14z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#2E5D4D] mb-2">School</h2>
            <p className="text-gray-500 text-sm">Register your institution and manage psychologist requests.</p>
          </Link>

          {/* Psychologist Card */}
          <Link
            href="/register/psychologist"
            className="group flex flex-col items-center justify-center p-8 bg-[#F0F5F2] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4 p-4 bg-[#BCE2D0] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#2E5D4D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.558V18l-9 5-9-5v-5.442a12.083 12.083 0 012.84-1.98L12 14z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#2E5D4D] mb-2">Psychologist</h2>
            <p className="text-gray-500 text-sm">Register yourself and get matched with schools needing your expertise.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
