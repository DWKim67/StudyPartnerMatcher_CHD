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
    <div className="flex items-center justify-between p-5 bg-gray-800 rounded-lg shadow-lg mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={avatarUrl} alt={`${name}'s avatar`} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xl text-white">{name}</p>
          <p className="text-sm text-gray-400"># {number}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-xl text-white">{hours} hours</p>
        <div className="w-32 bg-gray-600 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(hours / 120) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-lime-300 to-sky-300 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl text-white font-bold">Study Partner Leaderboard</h1>
        <p className="text-lg text-white mt-2">Compete with your friends to study more hours with your partner!</p>
      </div>

      {/* Dynamic and Fun Space Filling */}
      <div className="flex justify-center items-center space-x-10 mb-12">
        <div className="w-32 h-32 rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-3xl">
          📊
        </div>
        <div className="w-32 h-32 rounded-full bg-pink-500 flex justify-center items-center text-white font-bold text-3xl">
          🕒
        </div>
        <div className="w-32 h-32 rounded-full bg-yellow-500 flex justify-center items-center text-white font-bold text-3xl">
          🎓
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-4xl w-full px-4">
        {leaderboardData.map((user, index) => (
          <LeaderboardCell
            key={user.name}
            number={user.number}
            name={user.name}
            hours={user.hours}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl text-white font-bold mb-4">Your Progress</h2>
        <div className="w-3/4 bg-gray-600 rounded-full mx-auto mb-4">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `60%` }} // Dynamic progress bar based on user hours
          ></div>
        </div>
        <p className="text-lg text-white">Keep going! You're on your way to reaching 100 hours!</p>
      </div>

      {/* Animated Section */}
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-2xl text-white font-bold mb-4">Study More, Earn More!</h2>
        <div className="flex justify-center items-center space-x-5">
          <div className="w-20 h-20 bg-purple-600 rounded-full animate-pulse flex justify-center items-center text-white text-2xl">
            💪
          </div>
          <div className="w-20 h-20 bg-green-600 rounded-full animate-bounce flex justify-center items-center text-white text-2xl">
            🚀
          </div>
          <div className="w-20 h-20 bg-red-600 rounded-full animate-pulse flex justify-center items-center text-white text-2xl">
            🔥
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
