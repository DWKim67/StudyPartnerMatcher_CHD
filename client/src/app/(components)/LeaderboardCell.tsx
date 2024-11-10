import React from "react";

// LeaderboardCell Component
type LeaderboardCellProps = {
  rank: number;
  hours: number;
  name: string;
  avatarUrl: string;
};

const LeaderboardCell = ({ rank, hours, name, avatarUrl }: LeaderboardCellProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-gray-300 hover:bg-gray-100 transition-all duration-200">
      {/* Rank */}
      <div className="flex items-center space-x-4">
        <p className="text-2xl font-semibold text-gray-800">{rank}</p>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={avatarUrl} alt={`${name}'s avatar`} className="w-full h-full object-cover" />
        </div>
        <p className="text-2xl text-gray-800">{name}</p>
      </div>

      {/* Hours Studied */}
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-500">Hours Studied</p>
        <div className="text-2xl font-semibold text-blue-600">{hours} hrs</div>
      </div>

      {/* Badge or Highlight */}
      {rank === 1 ? (
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
          🏆
        </div>
      ) : (
        <div className="text-gray-500 text-xl"># {rank}</div>
      )}
    </div>
  );
};

// Leaderboard Component
type LeaderboardData = {
  rank: number;
  name: string;
  hours: number;
  avatarUrl: string;
};

const leaderboardData: LeaderboardData[] = [
  {
    rank: 1,
    name: "John Doe",
    hours: 10,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rank: 2,
    name: "Jane Smith",
    hours: 8,
    avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    rank: 3,
    name: "Sam Brown",
    hours: 7,
    avatarUrl: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  // Add more leaderboard data as needed
];

const Leaderboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        Study Partner Leaderboard
      </h1>

      {/* Leaderboard List */}
      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <LeaderboardCell
            key={entry.rank}
            rank={entry.rank}
            name={entry.name}
            hours={entry.hours}
            avatarUrl={entry.avatarUrl}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          Keep up the great work! The more hours you study, the higher your rank will be.
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
