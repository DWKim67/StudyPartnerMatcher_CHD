import StudentMatchPart from "@/app/(components)/StudentMatchPart";
import React from "react";

const MatchingStudentsPage = () => {
  const items = [1, 2, 3, 4, 5]; // Array of items
  return (
    <div>
      <div className="grid grid-cols-3">
        {items.map((item, index) => (
          <StudentMatchPart key={index} />
        ))}
      </div>
    </div>
  );
};

export default MatchingStudentsPage;
