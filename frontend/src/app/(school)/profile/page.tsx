"use client";

import React, { useState } from "react";

export default function SchoolProfile() {
  const [schoolInfo, setSchoolInfo] = useState({
    name: "Sunshine Public School",
    email: "admin@sunshine.edu",
    phone: "+91 9876543210",
    address: "123 Sunshine St, Mumbai, India",
    principal: "Mr. Rajesh Kumar",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchoolInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    // Call API to save updated school info
    alert("Profile saved successfully!");
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">School Profile</h1>
      <p className="text-gray-500">
        View and update your school's information.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">School Name</label>
            <input
              type="text"
              name="name"
              value={schoolInfo.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5D4D] focus:border-[#2E5D4D] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={schoolInfo.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5D4D] focus:border-[#2E5D4D] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={schoolInfo.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5D4D] focus:border-[#2E5D4D] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Principal Name</label>
            <input
              type="text"
              name="principal"
              value={schoolInfo.principal}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5D4D] focus:border-[#2E5D4D] ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={schoolInfo.address}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E5D4D] focus:border-[#2E5D4D] ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Action Buttons */}
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-[#2E5D4D] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#265143] transition-all"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
