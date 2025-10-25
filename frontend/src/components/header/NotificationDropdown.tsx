"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, title: "New appointment request", time: "5 min ago" },
  { id: 2, title: "User registered: Shivam Dhamale", time: "30 min ago" },
  { id: 3, title: "System maintenance scheduled", time: "2 hrs ago" },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-[#BCE2D0] text-[#2E5D4D] hover:bg-[#DFF2E8] transition"
      >
        <Bell size={20} />
        {/* Optional red dot for unread */}
        <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500"></span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#F0F5F2] rounded-xl shadow-lg border border-[#DFF2E8] z-50">
          <div className="p-4 border-b border-[#DFF2E8] text-[#2E5D4D] font-semibold">
            Notifications
          </div>
          <ul className="flex flex-col">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="px-4 py-3 hover:bg-[#DFF2E8] transition cursor-pointer rounded-t-xl"
              >
                <p className="text-sm font-medium text-[#2E5D4D]">{n.title}</p>
                <p className="text-xs text-[#5C9E8F]">{n.time}</p>
              </li>
            ))}
          </ul>
          <div className="p-3 border-t border-[#DFF2E8] text-center">
            <button className="text-sm text-[#5C9E8F] hover:text-[#2E5D4D] transition">
              See all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
