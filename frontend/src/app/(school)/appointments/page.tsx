"use client";
import React, { useState } from "react";
import { CalendarDays, Users, Activity, BarChart3 } from "lucide-react";

type AppointmentStatus = "Pending" | "Confirmed" | "Completed";

type Appointment = {
  student: string;
  psychologist: string;
  date: string;
  status: AppointmentStatus;
};

export default function SchoolAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { student: "Shivam Dhamale", psychologist: "Dr. Meera Sharma", date: "Oct 26, 2025", status: "Confirmed" },
    { student: "Riya Patil", psychologist: "Dr. Raghav Menon", date: "Oct 27, 2025", status: "Pending" },
    { student: "Ananya Joshi", psychologist: "Dr. Sneha Patel", date: "Oct 28, 2025", status: "Completed" },
    { student: "Aarav Deshmukh", psychologist: "Dr. Riya Singh", date: "Oct 29, 2025", status: "Pending" },
  ]);

  const [filter, setFilter] = useState<AppointmentStatus | "All">("All");

  // Dummy input states
  const [studentName, setStudentName] = useState("John Doe");
  const [psychologistName, setPsychologistName] = useState("Dr. Meera Sharma");
  const [dateString, setDateString] = useState(new Date().toISOString().split("T")[0]);

  const filteredAppointments = appointments.filter(
    (app) => filter === "All" || app.status === filter
  );

  const getStatusClasses = (status: AppointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-sage-100 text-sage-700";
    }
  };

  // Create appointment locally without API
  const handleCreate = () => {
    const newAppointment: Appointment = {
      student: studentName || "John Doe",
      psychologist: psychologistName || "Dr. Meera Sharma",
      date: dateString || new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setAppointments([...appointments, newAppointment]);

    // Reset inputs
    setStudentName("John Doe");
    setPsychologistName("Dr. Meera Sharma");
    setDateString(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-500 mt-1">
          Manage all appointments between your students and psychologists.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Users className="w-6 h-6 text-sage-600" />, title: "Total Students", value: "120" },
          { icon: <Activity className="w-6 h-6 text-sage-600" />, title: "Active Psychologists", value: "8" },
          { icon: <CalendarDays className="w-6 h-6 text-sage-600" />, title: "Upcoming Sessions", value: "15" },
          { icon: <BarChart3 className="w-6 h-6 text-sage-600" />, title: "Completed Appointments", value: "42" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-all border border-sage-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sage-100 rounded-xl">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mt-4">
        {(["All", "Pending", "Confirmed", "Completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${
              filter === status
                ? "bg-[#2E5D4D] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Create Appointment */}
      <div className="mt-4 p-4 bg-white rounded-2xl border border-sage-100 shadow space-y-3">
        <h2 className="text-lg font-semibold">Create New Appointment</h2>
        <input
          type="text"
          placeholder="Student Name"
          className="border p-2 rounded w-full"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Psychologist Name"
          className="border p-2 rounded w-full"
          value={psychologistName}
          onChange={(e) => setPsychologistName(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={dateString}
          onChange={(e) => setDateString(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[#2E5D4D] text-white rounded-lg hover:bg-[#265143] transition"
        >
          Create Appointment
        </button>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto mt-4 bg-white p-6 rounded-2xl shadow border border-sage-100">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sage-50 text-gray-600">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Psychologist</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app, idx) => (
              <tr key={idx} className="border-t hover:bg-sage-50">
                <td className="py-3 px-4 font-medium">{app.student}</td>
                <td className="py-3 px-4">{app.psychologist}</td>
                <td className="py-3 px-4">{app.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="px-3 py-1 bg-[#2E5D4D] text-white text-xs rounded-lg hover:bg-[#265143] transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
