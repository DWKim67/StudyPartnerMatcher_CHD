"use client"; // Add this line to make the component a Client Component

import React from "react";
import { useRouter } from "next/navigation";

const MainPage = () => {
  const router = useRouter();

  // Dummy user data for the logged-in user
  const user = {
    profilePic: "https://via.placeholder.com/150",
    name: "John Doe",
    major: "Computer Science",
    notifications: 5, // Number of unread notifications
  };

  // Navigate to a different page (Leaderboard, Notifications, etc.)
  const navigateTo = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 flex flex-col items-center space-y-8">
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={user.profilePic}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full border-4 border-gradient-to-r from-pink-500 to-indigo-500 shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-lg text-gray-600">{user.major}</p>
          </div>
        </div>

        {/* Welcome Message */}
        <p className="text-xl text-center text-gray-700 mb-8">
          Welcome back, {user.name}! Ready to find your perfect study buddy?
        </p>

        {/* Main Buttons */}
        <div className="w-full flex justify-around mb-8">
          <button
            onClick={() => navigateTo("find-study-buddy")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            Find Study Buddy
          </button>
          <button
            onClick={() => navigateTo("leaderboard")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            Leaderboard
          </button>
          <button
            onClick={() => navigateTo("notifications")}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            Notifications ({user.notifications})
          </button>
        </div>

        {/* Footer / App Info */}
        <div className="text-center text-gray-500 mt-8">
          <p>Explore and connect with fellow students!</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
