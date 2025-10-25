"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function PsychologistRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    specialization: "",
    availability: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you can call your backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F5F2] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#2E5D4D] mb-6 text-center">
          Psychologist Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification (e.g., MSc Clinical Psychology)"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Child Counseling)"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g., Mon-Fri, 9am-5pm)"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-sage-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#5C9E8F] text-white py-2 rounded-xl font-semibold hover:bg-[#2E5D4D] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/" className="text-sage-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
