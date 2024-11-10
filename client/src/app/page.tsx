import Image from "next/image";
import LeaderboardCell from "./(components)/LeaderboardCell";

export default function Home() {
  const items = [1, 2, 3, 4, 5]; // Array of items

  return (
    <div className="w-max">
      <div className="flex flex-col justify-center">
        <div className="flex justify-between">
          <p>Rank</p>
          <p className="pl-2">Name</p>
          <p>Hours</p>
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <hr className="my-2 border-t-2 border-gray-400" />
            <LeaderboardCell number={index + 1} hours={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
