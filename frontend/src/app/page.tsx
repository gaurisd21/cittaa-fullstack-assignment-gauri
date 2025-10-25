"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"school" | "psychologist">("school");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Mock login: redirect based on selected user type
    if (userType === "school") {
      router.push("/school-dashboard");
    } else {
      router.push("/psych-dashboard");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#BCE2D0] to-[#DFF2E8]">
      {/* Left Side: Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#2E5D4D] rounded-full opacity-10"></div>

          <h1 className="text-3xl font-bold text-[#2E5D4D] mb-6 text-center">CITTAA Login</h1>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-xl focus:border-[#2E5D4D] focus:ring-1 focus:ring-[#2E5D4D] outline-none shadow-sm transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-xl focus:border-[#2E5D4D] focus:ring-1 focus:ring-[#2E5D4D] outline-none shadow-sm transition"
            />

            {/* User Type Selector */}
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as "school" | "psychologist")}
              className="px-5 py-3 border border-gray-300 rounded-xl focus:border-[#2E5D4D] focus:ring-1 focus:ring-[#2E5D4D] outline-none shadow-sm transition"
            >
              <option value="school">School</option>
              <option value="psychologist">Psychologist</option>
            </select>

            <button
              type="submit"
              className="bg-[#2E5D4D] text-white py-3 rounded-xl font-semibold hover:bg-[#265143] transition-all shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <span className="font-semibold text-[#2E5D4D]">Register as:</span>
            </p>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/register/school"
              className="px-5 py-2 bg-[#DFF2E8] text-[#2E5D4D] rounded-xl font-medium hover:bg-[#BCE2D0] shadow-sm transition"
            >
              School
            </Link>
            <Link
              href="/register/psychologist"
              className="px-5 py-2 bg-[#DFF2E8] text-[#2E5D4D] rounded-xl font-medium hover:bg-[#BCE2D0] shadow-sm transition"
            >
              Psychologist
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <img
          src="/illustration-login.png"
          alt="Mental Health Illustration"
          className="w-3/4 max-w-xl animate-fadeIn"
        />
      </div>
    </div>
  );
}
