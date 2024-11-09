"use client";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

const StudentInfoPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="w-full ">
      <div className="flex justify-center pt-10">
        <h1 className="text-2xl font-semibold">
          Please fill in the following information to start matching
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <h2>Courses</h2>
          <input className="rounded-md border-2 border-black"></input>
        </div>
        <div>
          <h2>Choose a date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <input type="time" min="01:00" max="12:59" />
          <input type="time" min="01:00" max="12:59" />
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
