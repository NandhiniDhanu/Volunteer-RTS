import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "./attendance.css"
// Extend dayjs with the plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/attendance");
        setAllEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const filterEvents = (date) => {
    const selectedDate = dayjs(date).startOf("day");
    const selectedDateStr = selectedDate.format("YYYY-MM-DD");
    const selectedWeekday = selectedDate.format("dddd");

    const eventsForDate = allEvents.filter(({ event }) => {
      // Check if the event is ongoing (startDate <= selectedDate <= endDate)
      const isOngoing =
        event.startDate &&
        event.endDate &&
        dayjs(event.startDate).isSameOrBefore(selectedDate) &&
        dayjs(event.endDate).isSameOrAfter(selectedDate);

      // Check if the date is explicitly mentioned in randomDates
      const isRandomDate = event.randomDates?.includes(selectedDateStr);

      // Check if the event recurs on the selected weekday
      const isRecurringWeekly = event.weeklyDays?.includes(selectedWeekday);

      // Debugging individual event properties
      console.log("Selected Date:", selectedDateStr);
      console.log("Selected Weekday:", selectedWeekday);
      console.log("Event Start Date:", event.startDate);
      console.log("Event End Date:", event.endDate);
      console.log("Event Weekly Days:", event.weeklyDays);
      console.log("Event Random Dates:", event.randomDates);
      console.log("Is Ongoing:", isOngoing);
      console.log("Is Random Date:", isRandomDate);
      console.log("Is Recurring Weekly:", isRecurringWeekly);

      // Return true if any condition matches
      return isOngoing && (isRandomDate || isRecurringWeekly);
    });

    setFilteredEvents(eventsForDate);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date) {
      filterEvents(date);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="attendance-container">
      <h2>Attendance</h2>
      <label htmlFor="date-picker">Select a Date:</label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {filteredEvents.length === 0 ? (
        <p>No events or attendees for the selected date.</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Event</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(({ event, attendees = [] }) =>
              attendees.map((user) => (
                <tr key={`${event.id}-${user.email}`}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{event.title}</td>
                  <td>
                    <span className="status present">PRESENT</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;
