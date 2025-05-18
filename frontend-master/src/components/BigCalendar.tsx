"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { calendarEvents } from "@/app/lib/data";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 4, 17, 8, 0, 0)}  // May 17, 2025, 8:00 AM
      max={new Date(2025, 4, 17, 17, 0, 0)} // May 17, 2025, 5:00 PM
    />
  );
};

export default BigCalendar;
