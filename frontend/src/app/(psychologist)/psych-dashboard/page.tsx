"use client";

import React, { useMemo, useState } from "react";
import PsychSidebar from "@/layout/PsychSidebar";
import {
  GridIcon,
  CalenderIcon,
  ChatIcon,
  AlertIcon,
  BellIcon,
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
  note?: string;
};

const initialAppointments: Appointment[] = [
  { id: "a1", school: "Sunshine Public School", date: "Oct 26, 2025", time: "10:00 AM", status: "Accepted", note: "Term counseling — Grade 5" },
  { id: "a2", school: "Greenfield Academy", date: "Oct 27, 2025", time: "11:30 AM", status: "Pending", note: "New referral meeting" },
  { id: "a3", school: "Oakridge International", date: "Oct 28, 2025", time: "02:00 PM", status: "Declined", note: "Follow-up" },
  { id: "a4", school: "Blue Ridge School", date: "Oct 29, 2025", time: "09:00 AM", status: "Pending", note: "Group workshop" },
  { id: "a5", school: "Horizon High", date: "Oct 30, 2025", time: "03:00 PM", status: "Accepted", note: "Parent-teacher session" },
  { id: "a6", school: "Riverdale High", date: "Nov 01, 2025", time: "10:30 AM", status: "Pending", note: "Screening session" },
];

function statusClasses(s: AppointmentStatus) {
  switch (s) {
    case "Accepted":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Declined":
      return "bg-red-100 text-red-800";
  }
}

export default function PsychDashboard() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState<AppointmentStatus | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (filter !== "All" && a.status !== filter) return false;
      if (query && !`${a.school} ${a.note}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [appointments, filter, query]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === "Pending").length;
    const accepted = appointments.filter((a) => a.status === "Accepted").length;
    const declined = appointments.filter((a) => a.status === "Declined").length;
    return { total, pending, accepted, declined };
  }, [appointments]);

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] text-gray-800 overflow-x-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40 w-72 border-r border-gray-100 bg-white">
        <PsychSidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <EyeIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search schools, notes, appointments..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-1 focus:ring-[#2E5D4D]"
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <BellIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#EAF6F0] flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-[#2E5D4D]" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium text-sm text-gray-800">Dr. Meera Sharma</div>
                  <div className="text-xs text-gray-500">meera@cittaa.org</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#163A34]">Welcome back, Dr. Meera</h1>
              <p className="text-gray-600 text-sm">Here’s your overview of appointments and requests.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-4 py-2 bg-[#BCE2D0] text-[#2E5D4D] rounded-lg hover:shadow-md transition">
                View Calendar
              </button>
              <button className="px-4 py-2 bg-[#2E5D4D] text-white rounded-lg hover:bg-[#264f45] transition">
                + New Appointment
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<GridIcon className="w-6 h-6 text-[#2E5D4D]" />} title="Total" value={stats.total} />
            <StatCard icon={<CalenderIcon className="w-6 h-6 text-[#D08B2E]" />} title="Pending" value={stats.pending} />
            <StatCard icon={<ChatIcon className="w-6 h-6 text-[#2E5D4D]" />} title="Accepted" value={stats.accepted} />
            <StatCard icon={<AlertIcon className="w-6 h-6 text-[#B93E2B]" />} title="Declined" value={stats.declined} />
          </div>

          {/* Appointments */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="font-semibold text-gray-700 text-lg">Upcoming Appointments</h3>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="border px-3 py-2 rounded-lg text-sm"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <ul className="space-y-3">
                {filtered.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 p-3 border rounded-lg hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <div className="w-12 h-12 rounded-lg bg-[#EAF6F0] flex items-center justify-center">
                        <CalenderIcon className="w-6 h-6 text-[#2E5D4D]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{a.school}</div>
                        <div className="text-xs text-gray-500">{a.date} • {a.time}</div>
                        {a.note && <div className="text-xs text-gray-500">{a.note}</div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses(a.status)}`}>{a.status}</span>
                      {a.status === "Pending" ? (
                        <>
                          <button
                            onClick={() =>
                              setAppointments((p) =>
                                p.map((x) => (x.id === a.id ? { ...x, status: "Accepted" } : x))
                              )
                            }
                            className="px-3 py-1 bg-[#2E5D4D] text-white rounded-md text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              setAppointments((p) =>
                                p.map((x) => (x.id === a.id ? { ...x, status: "Declined" } : x))
                              )
                            }
                            className="px-3 py-1 bg-white text-[#B93E2B] border border-[#fdecea] rounded-md text-sm"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <button className="px-3 py-1 border rounded-md text-sm">Details</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EAF6F0] flex items-center justify-center">
                    <ChatIcon className="w-4 h-4 text-[#2E5D4D]" />
                  </div>
                  <div>
                    <div className="font-medium">Accepted — Greenfield Academy</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF7EA] flex items-center justify-center">
                    <CalenderIcon className="w-4 h-4 text-[#D08B2E]" />
                  </div>
                  <div>
                    <div className="font-medium">New request — Blue Ridge School</div>
                    <div className="text-xs text-gray-500">1 day ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <footer className="text-center text-xs text-gray-400 py-6">
            © {new Date().getFullYear()} CITTAA — Psychologist Dashboard
          </footer>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="p-3 rounded-lg bg-[#EAF6F0]">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
