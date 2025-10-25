"use client";

import React, { useMemo, useState } from "react";
import PsychSidebar from "@/layout/PsychSidebar";
import { EyeIcon, ChatIcon } from "@/icons";

type MatchStatus = "Pending" | "Confirmed" | "Declined";

type StudentMatch = {
  id: string;
  student: string;
  grade: string;
  school: string;
  status: MatchStatus;
  notes?: string;
};

const initialMatches: StudentMatch[] = [
  { id: "m1", student: "Rohan Sharma", grade: "5", school: "Sunshine Public School", status: "Pending" },
  { id: "m2", student: "Anika Verma", grade: "6", school: "Greenfield Academy", status: "Confirmed" },
  { id: "m3", student: "Karan Mehta", grade: "5", school: "Oakridge International", status: "Declined" },
  { id: "m4", student: "Tara Singh", grade: "7", school: "Blue Ridge School", status: "Pending" },
];

function statusClasses(status: MatchStatus) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Declined":
      return "bg-red-100 text-red-700";
  }
}

export default function PsychMatching() {
  const [matches, setMatches] = useState<StudentMatch[]>(initialMatches);
  const [filter, setFilter] = useState<MatchStatus | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      const matchesStatus = filter === "All" || m.status === filter;
      const matchesSearch = `${m.student} ${m.school}`.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [matches, filter, search]);

  function confirmMatch(id: string) {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Confirmed" } : m)));
  }

  function declineMatch(id: string) {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Declined" } : m)));
  }

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] text-gray-800">
      {/* Sidebar */}
      <PsychSidebar />

      {/* Main content */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white/70 backdrop-blur-sm border-b border-gray-100 z-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-[#163A34]">Student Matching</h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <ChatIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student or school..."
                  className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-sm focus:ring-1 focus:ring-[#2E5D4D]"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-[#2E5D4D]"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#EAF6F0] text-[#2E5D4D]">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Student</th>
                  <th className="py-3 px-4 text-left font-semibold">Grade</th>
                  <th className="py-3 px-4 text-left font-semibold">School</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No matching students found.
                    </td>
                  </tr>
                )}
                {filtered.map((m) => (
                  <tr key={m.id} className="border-t border-gray-100 hover:bg-[#F9FCFB] transition">
                    <td className="py-3 px-4">{m.student}</td>
                    <td className="py-3 px-4">{m.grade}</td>
                    <td className="py-3 px-4">{m.school}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses(m.status)}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {m.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => confirmMatch(m.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#2E5D4D] text-white hover:bg-[#264f45] transition text-xs"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => declineMatch(m.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#FFF5F3] text-[#B93E2B] border border-[#FEE2E2] hover:bg-[#FFF0F0] transition text-xs"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <button className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-xs">
                          <EyeIcon className="w-4 h-4" /> View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
