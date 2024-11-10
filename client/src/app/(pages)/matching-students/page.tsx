"use client"; 

import StudentMatchPart from "@/app/(components)/StudentMatchPart";
import React from "react";
import { useRouter } from "next/navigation";

const MatchingStudentsPage = () => {
 
  const items = [
    { id: 1, profilePic: "/path/to/image1.jpg", name: "Alice Johnson", compatibility: 85, major: "Computer Science" },
    { id: 2, profilePic: "/path/to/image2.jpg", name: "Bob Smith", compatibility: 92, major: "Biology" },
    { id: 3, profilePic: "/path/to/image3.jpg", name: "Clara Lee", compatibility: 78, major: "Physics" },
    { id: 4, profilePic: "/path/to/image4.jpg", name: "David Park", compatibility: 88, major: "Mathematics" },
    { id: 5, profilePic: "/path/to/image5.jpg", name: "Ella Davis", compatibility: 81, major: "History" },
    { id: 6, profilePic: "/path/to/image6.jpg", name: "Frank Miller", compatibility: 90, major: "Engineering" },
  ];

  const router = useRouter();
  const navigateTo = (page: string) => {
    router.push(`http://localhost:3000/${page}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
    
      <button
        onClick={() => window.history.back()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <button onClick={() => navigateTo("user-matching")}>
            <div
            key={item.id}
            className="transform transition duration-200 hover:scale-105 p-6 bg-white border rounded-lg shadow-md text-center"
          >
            <img
              src={item.profilePic}
              alt={`Profile of ${item.name}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          
            <h3 className="text-lg font-bold">{item.name}</h3>

            <p
              className={`text-2xl font-semibold mt-2 ${
                item.compatibility >= 90
                  ? "text-green-500"
                  : item.compatibility >= 80
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Compatibility: {item.compatibility}%
            </p>

            <p className="text-gray-600">{item.major}</p>
          </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchingStudentsPage;
