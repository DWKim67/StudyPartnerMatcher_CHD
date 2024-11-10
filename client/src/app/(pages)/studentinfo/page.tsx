"use client";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

type TimeBlock = {
  start: Date;
  end: Date;
};

const StudentInfoPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dates, setDates] = useState<TimeBlock[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [courseInput, setCourseInput] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleCourseOnClick = () => {
    setCourses([...courses.slice(0, courses.length), courseInput]);
  };

  const handleDateOnClick = () => {
    var startDate = convertToDate(startTime);
    var endDate = convertToDate(endTime);
    setDates([
      ...dates.slice(0, dates.length),
      { start: startDate, end: endDate },
    ]);
  };

  const convertToDate = (timeString: string) => {
    var date = new Date(selectedDate!.getTime());
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

  return (
    <div className="w-full ">
      <div className="flex justify-center pt-10">
        <h1 className="text-2xl font-semibold">
          Please fill in the following information to start matching
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <h2>Courses</h2>
          <input
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
            className="rounded-md border-2 border-black"
          ></input>
          <button onClick={handleCourseOnClick}>
            <CiCirclePlus />
          </button>
        </div>
        <div>
          {courses.map((course, index) => (
            <p key={index}>{course}</p>
          ))}
        </div>
        <div>
          <h2>Choose a date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            min="01:00"
            max="12:59"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            min="01:00"
            max="12:59"
          />
          <button onClick={handleDateOnClick}>
            <CiCirclePlus />
          </button>
        </div>
        <div>
          {dates.map((date, index) => (
            <p key={index}>
              {"From :" +
                date.start.toLocaleString() +
                "to: " +
                date.end.toLocaleString()}
            </p>
          ))}
        </div>
        <div>
          <h2>Put in your study habits</h2>
          <input placeholder="Lazy, I like to ..., etc" />
        </div>
      </div>
    </div>
  );
};

export default StudentInfoPage;
