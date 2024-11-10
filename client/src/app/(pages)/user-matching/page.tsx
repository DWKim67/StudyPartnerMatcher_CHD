"use client"; // Add this line to make the component a Client Component

import React from "react";

const UserMatchingPage = () => {
  // Dummy data for the profile
  const user = {
    profilePic: "https://via.placeholder.com/150",
    name: "John Doe",
    compatibilityRate: 92,
    major: "Computer Science",
    availableTimes: "Mon, Wed, Fri - 2-4 PM",
    description:
      "Passionate about exploring complex algorithms and loves quiet study sessions. Looking for a study partner who enjoys deep dives into data structures and collaborates well on hands-on projects.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-8">
      {/* Left Sidebar */}
      <div className="hidden md:flex flex-col items-center w-1/5 bg-blue-200 rounded-l-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-700">Options</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Home
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Search Profiles
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Messages
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Settings
          </li>
        </ul>
      </div>

      {/* Profile Card */}
      <div className="flex-grow max-w-3xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Profile Picture */}
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile`}
          className="w-32 h-32 rounded-full shadow-lg mb-6 border-4 border-blue-500"
        />

        {/* User Information */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
        <p className="text-lg text-gray-600 mb-1 font-medium">Major: {user.major}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">
          {user.compatibilityRate}% Compatibility
        </p>

        {/* Description */}
        <p className="text-center text-gray-700 px-8 mb-4">{user.description}</p>

        {/* Available Times Badge */}
        <div className="bg-blue-100 text-blue-700 font-medium py-2 px-6 rounded-full shadow-sm text-sm mb-6">
          Available Times: {user.availableTimes}
        </div>

        {/* Connect/Plan Button */}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Connect/Plan
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:flex flex-col items-center w-1/5 bg-blue-200 rounded-r-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-700">Quick Links</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Notifications
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Study Groups
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Resources
          </li>
          <li className="text-blue-700 font-medium cursor-pointer hover:text-blue-500">
            Help Center
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMatchingPage;
