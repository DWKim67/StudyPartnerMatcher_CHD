"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // Assuming the Calendar component is correctly imported

type TimeBlock = {
  start: Date;
  end: Date;
};

const StudentInfoPage = () => {

  const router = useRouter();
  const navigateTo = (page: string) => {
    router.push(`http://localhost:3000/${page}`);
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dates, setDates] = useState<TimeBlock[]>([]);
  const [courses, setCourses] = useState<string | null>(null);
  const [courseInput, setCourseInput] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [studyHabit, setStudyHabit] = useState<string>("");
  const [studyHabits, setStudyHabits] = useState<string[]>([]);

  const handleCourseOnClick = () => {
    if (courseInput && !courses) {
      setCourses(courseInput);
      setCourseInput("");
    }
  };

  const handleRemoveCourse = () => {
    setCourses(null);
  };

  const handleDateOnClick = () => {
    const startDate = convertToDate(startTime);
    const endDate = convertToDate(endTime);
    setDates([...dates, { start: startDate, end: endDate }]);
  };

  const convertToDate = (timeString: string) => {
    const date = new Date(selectedDate!.getTime());
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleStudyHabitEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && studyHabit) {
      setStudyHabits((prev) => [...prev, studyHabit]);
      setStudyHabit("");
    }
  };

  const handleSubmit = () => {
    const dataToSend = {
      course: courses,
      dates: dates,
      studyHabits: studyHabits,
    };
    console.log("Data sent to the database:", dataToSend);

    setCourses(null);
    setDates([]);
    setStudyHabits([]);
    setStartTime("");
    setEndTime("");
    setCourseInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Weekly Study Information
        </h1>

        {/* Course Input Section */}
        <div className="flex items-center mb-6">
          <label className="text-lg text-gray-800 w-1/3">Course</label>
          <input
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
            className="rounded-md border-2 border-gray-300 p-2 flex-grow"
            placeholder="Enter course name"
          />
          <button
            onClick={courses ? handleRemoveCourse : handleCourseOnClick}
            className={`ml-4 px-4 py-2 rounded-md ${
              courses ? "bg-red-500" : "bg-blue-500"
            } text-white`}
          >
            {courses ? "Remove" : "Add"}
          </button>
        </div>
        {courses && (
          <p className="text-gray-600 text-center mb-6">Current Course: {courses}</p>
        )}

        {/* Calendar and Time Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Choose a Date</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border p-4 w-full"
            />
          </div>

          <div className="flex flex-col items-center p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Select Time Block</h2>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-md border-2 border-gray-300 p-2 w-full mb-4"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-md border-2 border-gray-300 p-2 w-full mb-4"
            />
            <button
              onClick={handleDateOnClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Add Time Block
            </button>
          </div>
        </div>

        {/* Display Added Time Blocks */}
        {dates.length > 0 && (
          <div className="mb-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Added Time Blocks</h3>
            {dates.map((date, index) => (
              <p key={index} className="text-gray-700">
                From: {date.start.toLocaleString()} To: {date.end.toLocaleString()}
              </p>
            ))}
          </div>
        )}

        {/* Study Habits Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Study Habits</h2>
          <input
            value={studyHabit}
            onChange={(e) => setStudyHabit(e.target.value)}
            onKeyDown={handleStudyHabitEnter}
            className="rounded-md border-2 border-gray-300 p-2 w-full mb-4"
            placeholder="Enter study habit and press Enter"
          />
          {studyHabits.length > 0 && (
            <ul className="list-disc list-inside text-gray-600 ml-4">
              {studyHabits.map((habit, index) => (
                <li key={index}>{habit}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigateTo("matching-students")}
          className="w-full bg-green-500 text-white py-3 rounded-md text-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StudentInfoPage;
