"use client"; // Add this line to make the component a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import NotificationMenu from "@/app/(components)/NotificationMenu";
import Image from "next/image";

const MainPage = () => {
  const router = useRouter();

  const [hideNotif, setHideNotif] = useState<boolean>(true);

  const handleNotifOnClick = () => {
    setHideNotif(!hideNotif);
  };

  // Dummy user data for the logged-in user
  const user = {
    profilePic: "/golden-retriever-dog-breed-info.jpeg",
    name: "Adam Johnson",
    major: "Computer Science",
    notifications: 5, // Number of unread notifications
  };

  // Navigate to a different page (Leaderboard, Notifications, etc.)
  const navigateTo = (page: string) => {
    router.push(`http://localhost:3000/${page}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 relative flex flex-col items-center space-y-8">
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-8">
          <Image
            src={user.profilePic}
            width={64}
            height={64}
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
            onClick={() => navigateTo("studentinfo")}
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
        </div>
        {/* Notification Button */}
        <div className="absolute right-0 top-0 mr-4">
          <button
            onClick={handleNotifOnClick}
            className="w-20 h-16 rounded-md bg-slate-400 flex justify-center"
          >
            <FaBell className="w-16 h-16 py-2 px-4 text-white" />
          </button>
        </div>
        <div className="absolute right-0 top-20 mr-4">
          <NotificationMenu hideNotif={hideNotif} setHideNotif={setHideNotif} />
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
