"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Users, Activity, CalendarDays, BarChart3, Bell } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

// Mock data
const statsData = [
  { icon: <Users className="w-6 h-6 text-sage-600" />, title: "Total Students", value: 320 },
  { icon: <Activity className="w-6 h-6 text-sage-600" />, title: "Active Psychologists", value: 12 },
  { icon: <CalendarDays className="w-6 h-6 text-sage-600" />, title: "Upcoming Sessions", value: 8 },
  { icon: <BarChart3 className="w-6 h-6 text-sage-600" />, title: "Pending Requests", value: 5 },
];

const mockAppointments = [
  { student: "John Doe", psychologist: "Dr. Meera Sharma", date: "Oct 26, 2025", status: "Confirmed" },
  { student: "Jane Smith", psychologist: "Dr. Raghav Menon", date: "Oct 27, 2025", status: "Pending" },
  { student: "Aarav Kumar", psychologist: "Dr. Sneha Patel", date: "Oct 28, 2025", status: "Completed" },
  { student: "Saanvi Gupta", psychologist: "Dr. Riya Singh", date: "Oct 29, 2025", status: "Pending" },
];

const chartData = [
  { name: "Confirmed", value: 8 },
  { name: "Pending", value: 5 },
  { name: "Completed", value: 12 },
];

const COLORS = ["#34D399", "#FBBF24", "#94A3B8"];

const barChartData = [
  { day: "Mon", appointments: 2 },
  { day: "Tue", appointments: 4 },
  { day: "Wed", appointments: 3 },
  { day: "Thu", appointments: 5 },
  { day: "Fri", appointments: 1 },
  { day: "Sat", appointments: 3 },
  { day: "Sun", appointments: 2 },
];

export default function SchoolDashboard() {
  const [filter, setFilter] = useState<"All" | "Confirmed" | "Pending" | "Completed">("All");

  const filteredAppointments = mockAppointments.filter(
    (app) => filter === "All" || app.status === filter
  );

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-sage-100 text-sage-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, School Admin 👋</h1>
        <p className="text-gray-500 mt-1">Here's a summary of your school's mental health activities.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((item, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-all border border-sage-100 flex items-center gap-3">
            <div className="p-3 bg-sage-100 rounded-xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link href="/appointments" className="px-5 py-2 bg-[#2E5D4D] text-white rounded-xl hover:bg-[#265143] transition shadow-md flex items-center gap-2">
          <CalendarDays className="w-5 h-5" /> Schedule Appointment
        </Link>
        <Link href="/matching" className="px-5 py-2 bg-[#2E5D4D] text-white rounded-xl hover:bg-[#265143] transition shadow-md flex items-center gap-2">
          <BarChart3 className="w-5 h-5" /> View Matching Dashboard
        </Link>
        <button className="px-5 py-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition shadow-md flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notifications
        </button>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sage-50 text-gray-600">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Psychologist</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app, idx) => (
              <tr key={idx} className="border-t hover:bg-sage-50">
                <td className="py-3 px-4 font-medium">{app.student}</td>
                <td className="py-3 px-4">{app.psychologist}</td>
                <td className="py-3 px-4">{app.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(app.status)}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Appointment Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Appointments This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#2E5D4D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-gray-700">
          <li>John Doe requested an appointment with Dr. Meera Sharma</li>
          <li>Dr. Raghav Menon confirmed an appointment</li>
          <li>Aarav Kumar completed a session</li>
          <li>New notification received from Dr. Sneha Patel</li>
        </ul>
      </div>
    </div>
  );
}
