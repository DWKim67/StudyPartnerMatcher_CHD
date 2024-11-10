import React from "react";

const StudentMatchPart = () => {
  return (
    <div className="relative w-72 h-96 bg-red-700 rounded-md text-white">
      <div className="bottom-0 left-0 absolute pl-3 pb-2 drop-shadow-sm">
        <p className="font-bold text-xl">Alice Johnson</p>
        <p className="font-bold text-lg">Computer Science</p>
      </div>
      <div className="bottom-0 right-0 absolute pr-3 pb-4 drop-shadow-sm">
        <p className="font-bold text-4xl">95%</p>
      </div>
    </div>
  );
};

export default StudentMatchPart;
