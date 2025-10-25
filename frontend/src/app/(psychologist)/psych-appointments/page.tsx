"use client";

import React, { useMemo, useState } from "react";
import PsychSidebar from "@/layout/PsychSidebar";
import {
  GridIcon,
  CalenderIcon,
  ChatIcon,
  AlertIcon,
  EyeIcon,
  UserCircleIcon,
} from "@/icons";

type AppointmentStatus = "Pending" | "Accepted" | "Declined";
type Appointment = {
  id: string;
  school: string;
  date: string;
  time?: string;
  status: AppointmentStatus;
  purpose?: string;
  notes?: string;
};

const initialAppointments: Appointment[] = [
  { id: "a1", school: "Sunshine Public School", date: "Oct 26, 2025", time: "10:00 AM", status: "Accepted", purpose: "Student counseling" },
  { id: "a2", school: "Greenfield Academy", date: "Oct 27, 2025", time: "11:30 AM", status: "Pending", purpose: "New referral" },
  { id: "a3", school: "Oakridge International", date: "Oct 28, 2025", time: "02:00 PM", status: "Declined", purpose: "Follow-up" },
  { id: "a4", school: "Blue Ridge School", date: "Oct 29, 2025", time: "09:00 AM", status: "Pending", purpose: "Group workshop" },
  { id: "a5", school: "Horizon High", date: "Oct 30, 2025", time: "03:00 PM", status: "Accepted", purpose: "Parent-teacher session" },
];

function statusClasses(status: AppointmentStatus) {
  switch (status) {
    case "Accepted":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Declined":
      return "bg-red-100 text-red-700";
  }
}

export default function PsychAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState<AppointmentStatus | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesStatus = filter === "All" || a.status === filter;
      const matchesSearch = `${a.school} ${a.purpose}`.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [appointments, filter, search]);

  function acceptAppointment(id: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Accepted" } : a))
    );
  }

  function declineAppointment(id: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Declined" } : a))
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] text-gray-800">
      <PsychSidebar />

      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white/70 backdrop-blur-sm border-b border-gray-100 z-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-[#163A34]">Appointments</h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <GridIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by school or purpose..."
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
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#EAF6F0] text-[#2E5D4D]">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">School</th>
                  <th className="py-3 px-4 text-left font-semibold">Date</th>
                  <th className="py-3 px-4 text-left font-semibold">Time</th>
                  <th className="py-3 px-4 text-left font-semibold">Purpose</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No matching appointments found.
                    </td>
                  </tr>
                )}
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-gray-100 hover:bg-[#F9FCFB] transition"
                  >
                    <td className="py-3 px-4">{a.school}</td>
                    <td className="py-3 px-4">{a.date}</td>
                    <td className="py-3 px-4">{a.time}</td>
                    <td className="py-3 px-4">{a.purpose}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses(
                          a.status
                        )}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {a.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => acceptAppointment(a.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#2E5D4D] text-white hover:bg-[#264f45] transition text-xs"
                          >
                            <AlertIcon className="w-4 h-4" /> Accept
                          </button>
                          <button
                            onClick={() => declineAppointment(a.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#FFF5F3] text-[#B93E2B] border border-[#FEE2E2] hover:bg-[#FFF0F0] transition text-xs"
                          >
                            <ChatIcon className="w-4 h-4" /> Decline
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
