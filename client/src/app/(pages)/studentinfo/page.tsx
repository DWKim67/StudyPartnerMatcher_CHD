"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // Assuming the Calendar component is correctly imported

type TimeBlock = {
  start: Date;
  end: Date;
};

const StudentInfoPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dates, setDates] = useState<TimeBlock[]>([]);
  const [courses, setCourses] = useState<string | null>(null); // Only one course at a time
  const [courseInput, setCourseInput] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [studyHabit, setStudyHabit] = useState<string>("");
  const [studyHabits, setStudyHabits] = useState<string[]>([]);

  // Handle adding the course
  const handleCourseOnClick = () => {
    if (courseInput && !courses) {
      setCourses(courseInput);
      setCourseInput("");
    }
  };

  // Handle removing the course
  const handleRemoveCourse = () => {
    setCourses(null);
  };

  // Handle adding date and time blocks
  const handleDateOnClick = () => {
    const startDate = convertToDate(startTime);
    const endDate = convertToDate(endTime);
    setDates([
      ...dates.slice(0, dates.length),
      { start: startDate, end: endDate },
    ]);
  };

  // Convert time input into a Date object
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

  // Handle adding study habit when Enter key is pressed
  const handleStudyHabitEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && studyHabit) {
      setStudyHabits((prev) => [...prev, studyHabit]);
      setStudyHabit(""); // Reset input
    }
  };

  // Handle submitting all data to the database and clearing current data
  const handleSubmit = () => {
    // Send data to the database
    const dataToSend = {
      course: courses,
      dates: dates,
      studyHabits: studyHabits,
    };

    // Here you would implement the logic to send the data to your database
    console.log("Data sent to the database:", dataToSend);

    // Clear course and dates data for the new week
    setCourses(null);
    setDates([]);
    setStudyHabit("");
    setStartTime("");
    setEndTime("");
    setCourseInput("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-between p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Weekly Study Information
        </h1>
      </div>

      {/* Course Section */}
      <div className="mb-6">
        <div className="flex space-x-4 mb-3 items-center">
          <label className="text-lg text-gray-800">Course</label>
          <input
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
            className="rounded-md border-2 border-gray-300 p-2 flex-1"
            placeholder="Enter course name"
          />
          {courses ? (
            <button
              onClick={handleRemoveCourse}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Remove Course
            </button>
          ) : (
            <button
              onClick={handleCourseOnClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Course
            </button>
          )}
        </div>
        {courses && <p className="text-gray-600">Current Course: {courses}</p>}
      </div>

      {/* Date and Time Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="sm:w-1/2 flex flex-col space-y-4">
          <h2 className="text-lg text-gray-800">Choose a Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border p-3"
          />
        </div>

        <div className="sm:w-1/2 flex flex-col space-y-4">
          <h2 className="text-lg text-gray-800">Start Time</h2>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-md border-2 border-gray-300 p-2"
          />
          <h2 className="text-lg text-gray-800 mt-4">End Time</h2>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded-md border-2 border-gray-300 p-2"
          />
          <button
            onClick={handleDateOnClick}
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
          >
            Add Time Block
          </button>
        </div>
      </div>

      {/* Time Blocks */}
      <div className="mb-6">
        {dates.map((date, index) => (
          <p key={index} className="text-gray-700">
            From: {date.start.toLocaleString()} To: {date.end.toLocaleString()}
          </p>
        ))}
      </div>

      {/* Study Habits Section */}
      <div className="mb-6">
        <h2 className="text-lg text-gray-800 mb-2">Study Habits</h2>
        <div className="flex space-x-4 mb-4">
          <input
            value={studyHabit}
            onChange={(e) => setStudyHabit(e.target.value)}
            onKeyDown={handleStudyHabitEnter}
            className="rounded-md border-2 border-gray-300 p-2 w-full"
            placeholder="Enter study habit and press Enter"
          />
        </div>
        <div>
          {studyHabits.length > 0 && (
            <ul className="list-disc ml-6">
              {studyHabits.map((habit, index) => (
                <li key={index} className="text-gray-600">{habit}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-3 rounded-md text-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StudentInfoPage;
