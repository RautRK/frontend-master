"use client";

import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type AttendanceRecord = {
  date: string;
  status: "present" | "absent";
};

const attendance: AttendanceRecord[] = [
  { date: "2025-05-01", status: "present" },
  { date: "2025-05-02", status: "absent" },
  { date: "2025-05-03", status: "present" },
  { date: "2025-05-04", status: "absent" },
  { date: "2025-05-05", status: "present" },
  { date: "2025-05-06", status: "present" },
  { date: "2025-05-07", status: "absent" },
  { date: "2025-05-08", status: "present" },
  { date: "2025-05-09", status: "absent" },
  { date: "2025-05-10", status: "present" },
];

const AttendanceCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const { totalPresent, totalAbsent } = useMemo(() => {
    let present = 0;
    let absent = 0;
    for (const record of attendance) {
      if (record.status === "present") present++;
      else if (record.status === "absent") absent++;
    }
    return { totalPresent: present, totalAbsent: absent };
  }, []);

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Attendance</h2>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            const record = attendance.find((a) => a.date === dateString);
            if (record) {
              return (
                <div
                  className={`mt-1 mx-auto h-2 w-2 rounded-full ${
                    record.status === "present" ? "bg-blue-500" : "bg-red-500"
                  }`}
                />
              );
            }
          }
          return null;
        }}
      />
      <div className="mt-6 text-center">
        <p className="text-blue-600 font-semibold">Total Present: {totalPresent}</p>
        <p className="text-red-600 font-semibold">Total Absent: {totalAbsent}</p>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
