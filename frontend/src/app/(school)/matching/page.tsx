"use client";

import React, { useState } from "react";

type AppointmentStatus = "Pending" | "Accepted" | "Declined";

type Psychologist = {
  name: string;
  qualification: string;
  specialization: string;
  availability: string;
  status: AppointmentStatus;
};

const mockPsychologists: Psychologist[] = [
  {
    name: "Dr. Meera Sharma",
    qualification: "PhD in Child Psychology",
    specialization: "Child & Adolescent Therapy",
    availability: "Oct 26 - Oct 30, 2025",
    status: "Pending",
  },
  {
    name: "Dr. Raghav Menon",
    qualification: "MSc Clinical Psychology",
    specialization: "School Counseling",
    availability: "Oct 28 - Nov 2, 2025",
    status: "Accepted",
  },
  {
    name: "Dr. Sneha Patel",
    qualification: "MSc Counseling Psychology",
    specialization: "Behavioral Therapy",
    availability: "Oct 29 - Nov 5, 2025",
    status: "Declined",
  },
  {
    name: "Dr. Karan Gupta",
    qualification: "MSc Counseling Psychology",
    specialization: "Emotional Development",
    availability: "Nov 2 - Nov 7, 2025",
    status: "Accepted",
  },
  {
    name: "Dr. Priya Menon",
    qualification: "PhD in Child & Adolescent Therapy",
    specialization: "Behavioral Therapy",
    availability: "Nov 3 - Nov 8, 2025",
    status: "Pending",
  },
  {
    name: "Dr. Ananya Roy",
    qualification: "PhD in Educational Psychology",
    specialization: "Learning Disabilities",
    availability: "Nov 1 - Nov 6, 2025",
    status: "Pending",
  },
];

export default function MatchingDashboard() {
  const [specialization, setSpecialization] = useState("");

  const filteredPsychologists = mockPsychologists.filter(
    (psych) =>
      specialization
        ? psych.specialization.toLowerCase().includes(specialization.toLowerCase())
        : true
  );

  const getStatusClasses = (status: AppointmentStatus) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Declined":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Browse Psychologists 👋</h1>
          <p className="text-gray-500 mt-1">
            View psychologists available for your school and request appointments.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder="Filter by specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#2E5D4D] transition"
          />
          <button className="px-4 py-2 bg-[#2E5D4D] text-white rounded-lg hover:bg-[#265143] transition w-full sm:w-auto">
            View Calendar
          </button>
        </div>
      </div>

      {/* Psychologist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPsychologists.map((psych, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{psych.name}</h2>
              <p className="text-gray-500 text-sm mb-1">{psych.qualification}</p>
              <p className="text-gray-500 text-sm mb-1">Specialization: {psych.specialization}</p>
              <p className="text-gray-500 text-sm mb-3">Availability: {psych.availability}</p>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                  psych.status
                )}`}
              >
                {psych.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
