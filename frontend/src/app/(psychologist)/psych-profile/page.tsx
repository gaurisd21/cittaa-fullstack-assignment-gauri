"use client";

import React, { useState } from "react";
import PsychSidebar from "@/layout/PsychSidebar";
import { UserCircleIcon } from "@/icons";

export default function PsychProfile() {
  const [profile, setProfile] = useState({
    name: "Dr. Meera Sharma",
    email: "meera.sharma@example.com",
    phone: "+91 9876543210",
    specialization: "Child & Adolescent Psychology",
    bio: "Experienced psychologist focused on student counseling and mental wellness.",
    school: "CITTAA",
  });

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] text-gray-800">
      {/* Sidebar */}
      <PsychSidebar />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white/70 backdrop-blur-sm border-b border-gray-100 z-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <UserCircleIcon className="w-8 h-8 text-[#5C9E8F]" />
            <h1 className="text-2xl font-extrabold text-[#163A34]">Profile</h1>
          </div>
        </div>

        {/* Profile Content */}
        <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            {/* Name */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="mt-1 text-gray-900">{profile.name}</p>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="mt-1 text-gray-900">{profile.email}</p>
            </div>

            {/* Phone */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="mt-1 text-gray-900">{profile.phone}</p>
            </div>

            {/* Specialization */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Specialization</h2>
              <p className="mt-1 text-gray-900">{profile.specialization}</p>
            </div>

            {/* School / Organization */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Organization</h2>
              <p className="mt-1 text-gray-900">{profile.school}</p>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Bio</h2>
              <p className="mt-1 text-gray-900">{profile.bio}</p>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#2E5D4D] text-white rounded-md hover:bg-[#264f45] transition">
                Edit Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
