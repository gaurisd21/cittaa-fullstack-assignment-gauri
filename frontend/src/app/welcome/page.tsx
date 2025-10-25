import { LayoutDashboard, CalendarDays, Users, BarChart3, ArrowRight } from "lucide-react";

export default function HomePage() {
  const stats = [
    { title: "Total Users", value: "1,248", icon: <Users size={28} />, color: "bg-[#DFF2E8] text-[#2E5D4D]" },
    { title: "Appointments Today", value: "32", icon: <CalendarDays size={28} />, color: "bg-[#DFF2E8] text-[#2E5D4D]" },
    { title: "Active Sessions", value: "84", icon: <BarChart3 size={28} />, color: "bg-[#DFF2E8] text-[#2E5D4D]" },
  ];

  return (
    <main className="min-h-screen px-6 py-10" style={{ backgroundColor: "#F0F5F2" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#2E5D4D] mb-2">Welcome, Sunshine School 👋</h1>
            <p className="text-[#2E5D4D]">Here’s what’s happening with your system today.</p>
          </div>

          <a
            href="/dashboard"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-xl shadow transition-all"
            style={{ backgroundColor: "#BCE2D0", color: "#2E5D4D" }}
          >
            <LayoutDashboard size={20} />
            Go to Dashboard
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow flex items-center justify-between"
              style={{ backgroundColor: "#DFF2E8" }}
            >
              <div>
                <p className="text-[#2E5D4D] text-sm">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Overview Section */}
        <div className="mt-10 rounded-2xl shadow p-6" style={{ backgroundColor: "#DFF2E8" }}>
          <h2 className="text-xl font-semibold mb-4 text-[#2E5D4D]">System Overview</h2>
          <p className="text-[#2E5D4D] leading-relaxed">
            Everything looks great today! You have multiple appointments scheduled, users actively
            engaging, and the system performance is running smoothly. Check your detailed analytics in
            the dashboard for deeper insights.
          </p>
        </div>
      </div>

      <footer className="text-center mt-12 text-[#5C9E8F] text-sm">
        © {new Date().getFullYear()} Cittaa Admin Panel — Built with ❤️ by Gauri
      </footer>
    </main>
  );
}
