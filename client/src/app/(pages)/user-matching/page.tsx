"use client"; // Add this line to make the component a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Define types for available times
interface AvailableTimes {
  [key: string]: string; // Key is the day, value is the time slot (e.g., "2-4 PM")
}

const UserMatchingPage = () => {
  // Use Next.js router to navigate
  const router = useRouter();
  const navigateTo = (page: string) => {
    router.push(`http://localhost:3000/${page}`);
  };
  // Dummy data for the profile
  const user = {
    profilePic: "https://via.placeholder.com/150",
    name: "Alice Jackson",
    compatibilityRate: 95,
    major: "Computer Science",
    description:
      "I prefer studying in a quiet, focused setting, so I get along best with introverted study partners. I don’t enjoy loud or distracting environments, and I value having a partner who can help keep us both on track without needing constant conversation. Mutual accountability is key for me, and I enjoy supporting each other to stay productive.",
    availableTimes: {
      Monday: "2-4 PM",
      Wednesday: "2-4 PM",
      Friday: "2-4 PM",
    },
  };

  // Dummy data for the second user to compare times
  const user2 = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    compatibilityRate: 85,
    major: "Data Science",
    description:
      "An advocate for collaborative learning and enjoys brainstorming solutions with peers. Looking for a partner who is open to group discussions and solving problems together.",
    availableTimes: {
      Monday: "1-3 PM",
      Wednesday: "2-4 PM",
      Friday: "3-5 PM",
    },
  };

  // Function to find overlapping times between two users
  const getTimeOverlap = (
    times1: AvailableTimes,
    times2: AvailableTimes
  ): string[] => {
    const overlap: string[] = [];
    Object.keys(times1).forEach((day) => {
      if (times1[day] === times2[day]) {
        overlap.push(`${day}: ${times1[day]}`);
      }
    });
    return overlap.length > 0 ? overlap : ["No overlapping times"];
  };

  const timeOverlap = getTimeOverlap(user.availableTimes, user2.availableTimes);

  // State to hold the chat message
  const [message, setMessage] = useState("");

  // Handle message input change
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // Handle Connect/Plan click
  const handleConnectPlan = () => {
    alert(`Sent: ${message} - to ${user2.name}`);
    setMessage(""); // Clear message after sending
  };

  // Calculate compatibility color
  const compatibilityColor =
    user.compatibilityRate >= 80
      ? "text-green-600"
      : user.compatibilityRate >= 50
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 flex flex-col items-center space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 font-semibold text-lg mb-4 self-start"
        >
          &larr; Back
        </button>

        {/* Profile Picture */}
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile`}
          className="w-36 h-36 rounded-full border-4 border-gradient-to-r from-pink-500 to-indigo-500 shadow-lg mb-6"
        />
        {/* User Details */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{user.name}</h1>
        <p className="text-lg text-gray-600 mb-1 font-medium">
          Major: {user.major}
        </p>

        {/* Compatibility Rate */}
        <p className={`text-2xl font-semibold mb-4 ${compatibilityColor}`}>
          Compatibility Rate: {user.compatibilityRate}%
        </p>

        {/* Profile Description */}
        <p className="text-center text-gray-700 px-8 mb-6 italic">
          {user.description}
        </p>

        {/* Available Time Overlaps */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Available Time Overlaps
        </h3>
        <ul className="space-y-2">
          {timeOverlap.map((time, index) => (
            <li key={index} className="text-lg text-gray-700">
              <span className="font-bold text-blue-600">{time}</span>
            </li>
          ))}
        </ul>

        {/* Chat Input */}
        <div className="mt-8 w-full bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Send a Message
          </h3>
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here"
            className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-indigo-500 mb-4"
          />
        </div>

        {/* Connect/Plan Button */}
        <button
          onClick={() => navigateTo("homepage")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
        >
          Connect/Plan
        </button>
      </div>
    </div>
  );
};

export default UserMatchingPage;
