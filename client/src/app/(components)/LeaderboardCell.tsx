import React from "react";

type LeaderboardCellProps = {
  number: number;
  hours: number;
};

const LeaderboardCell = ({ number, hours }: LeaderboardCellProps) => {
  return (
    <div className="">
      <div className="flex justify-between space-x-5">
        <p className="text-2xl">{number}</p>
        <div className="w-20 h-20 rounded-full bg-blue-600" />
        <p className="text-2xl">John Doe</p>
        <p className="text-2xl">{hours}</p>
      </div>
    </div>
  );
};

export default LeaderboardCell;
