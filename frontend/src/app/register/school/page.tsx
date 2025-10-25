"use client";
import React, { useState } from "react";

export default function SchoolRegister() {
  const [formData, setFormData] = useState({
    institutionName: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("School registration submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#DFF2E8] to-[#BCE2D0] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-[#2E5D4D] mb-6 text-center">
          School Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            placeholder="Institution Name"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5C9E8F]"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5C9E8F]"
          />

          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Contact Email"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5C9E8F]"
          />

          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Contact Phone"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5C9E8F]"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5C9E8F]"
          />

          <button
            type="submit"
            className="w-full bg-[#5C9E8F] text-white py-2 rounded-xl font-semibold hover:bg-[#2E5D4D] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already registered?{" "}
          <a href="/" className="text-[#2E5D4D] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
