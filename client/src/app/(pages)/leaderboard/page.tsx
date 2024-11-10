import React from "react";

// Sample leaderboard data
const leaderboardData = [
  { number: 1, name: "John Doe", hours: 120, avatarUrl: "/path/to/avatar1.png" },
  { number: 2, name: "Jane Smith", hours: 95, avatarUrl: "/path/to/avatar2.png" },
  { number: 3, name: "Alice Johnson", hours: 85, avatarUrl: "/path/to/avatar3.png" },
  { number: 4, name: "Bob Brown", hours: 60, avatarUrl: "/path/to/avatar4.png" },
  { number: 5, name: "Charlie Lee", hours: 50, avatarUrl: "/path/to/avatar5.png" },
];

type LeaderboardCellProps = {
  number: number;
  name: string;
  hours: number;
  avatarUrl: string;
};

const LeaderboardCell = ({ number, name, hours, avatarUrl }: LeaderboardCellProps) => {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={avatarUrl} alt={`${name}'s avatar`} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xl text-gray-900 font-semibold">{name}</p>
          <p className="text-sm text-gray-500">Rank #{number}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-lg text-gray-900">{hours} hrs</p>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: `${(hours / 120) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8 flex justify-center">
      {/* Leaderboard and Progress Sidebar */}
      <div className="flex flex-row w-full max-w-6xl space-x-12">
        {/* Leaderboard Section */}
        <div className="flex flex-col w-3/4 space-y-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl text-gray-900 font-bold">Study Partner Leaderboard</h1>
            <p className="text-lg text-gray-700 mt-2">
              Track your study hours and compete with friends to reach new milestones!
            </p>
          </div>

          {/* Leaderboard container */}
          <div className="w-full max-w-3xl px-4">
            {leaderboardData.map((user) => (
              <LeaderboardCell
                key={user.name}
                number={user.number}
                name={user.name}
                hours={user.hours}
                avatarUrl={user.avatarUrl}
              />
            ))}
          </div>
        </div>

        {/* Sidebar with Progress Bar and Additional Info */}
        <div className="flex flex-col w-1/4 space-y-6">
          {/* Progress Bar */}
          <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-900 font-semibold">Your Progress</h2>
            <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3 mt-4 mb-2">
              <div
                className="bg-green-500 h-full rounded-full"
                style={{ width: `60%` }} // Adjust dynamically based on user progress
              ></div>
            </div>
            <p className="text-sm text-gray-700">60/100 hours - Keep going!</p>
          </div>

          {/* Pie Chart or Visual Data (Mockup for Now) */}
          <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-900 font-semibold">Your Study Breakdown</h2>
            <div className="flex justify-center items-center mt-4">
              {/* This could be a pie chart, here it's just a circle to represent progress */}
              <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex justify-center items-center text-3xl font-bold text-gray-900">
                60%
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4">You’ve completed 60% of your study goal!</p>
          </div>

          {/* Study Tips Section */}
          <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-900 font-semibold">Study Tips</h2>
            <p className="text-sm text-gray-700 mt-4">
              - Break your study time into 30-minute intervals with short breaks.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              - Focus on understanding concepts instead of memorization.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              - Try to teach someone else what you’ve learned to solidify knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
