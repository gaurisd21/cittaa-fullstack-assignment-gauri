import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GridIcon, CalenderIcon, UserCircleIcon, ChatIcon } from "../icons";

interface PsychSidebarProps {
  sidebarRole?: "psychologist" | "admin"; // or any future roles
}

const navItems = [
  { icon: <GridIcon className="w-5 h-5" />, name: "Dashboard", path: "/psych-dashboard" },
  { icon: <CalenderIcon className="w-5 h-5" />, name: "Appointments", path: "/psych-appointments" },
  { icon: <ChatIcon className="w-5 h-5" />, name: "Matching", path: "/psych-matching" },
  { icon: <UserCircleIcon className="w-5 h-5" />, name: "Profile", path: "/psych-profile" },
];

const PsychSidebar: React.FC<PsychSidebarProps> = ({ sidebarRole = "psychologist" }) => {
  const { isExpanded, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname() || "/";

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 bg-white text-gray-900 border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300
        ${isExpanded ? "w-72" : "w-20"}
        ${isHovered && !isExpanded ? "w-44" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="py-6 px-4 flex justify-center lg:justify-start transition-all duration-300">
        <Link href="/psychologist-dashboard" className="flex items-center">
          <h2 className="text-[#5C9E8F] font-bold text-xl">
            {isExpanded || isHovered ? "CITTAA" : "C"}
          </h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${isActive(item.path)
                    ? "bg-[#BCE2D0] text-[#2E5D4D] font-semibold shadow-inner"
                    : "hover:bg-[#DFF2E8] hover:text-[#2E5D4D]"}`
                }
              >
                {item.icon}
                {(isExpanded || isHovered) && (
                  <span className="text-gray-800 font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {(isExpanded || isHovered) && (
        <div className="mt-auto p-4 text-center text-sm text-gray-500">
          © 2025 CITTAA — {sidebarRole}
        </div>
      )}
    </aside>
  );
};

export default PsychSidebar;
