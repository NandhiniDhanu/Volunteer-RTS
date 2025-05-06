import React, { useState, useEffect } from "react";
import "./description.css";
import { BsCalendar2Date } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Description = ({ item }) => { // Changed prop name from post to item
  if (!item) {
    return (
      <div className="description__container">
        <p className="description__placeholder">
          Select an item to see details here.
        </p>
      </div>
    );
  }

  // Common fields for both types
  const { title, description, type } = item;
  
  // Post-specific fields
  const { startDate, endDate, startTime, endTime, location, weeklyDays, randomDates } = type === 'post' ? item : {};

  const { auth } = useAuth();
  const [highlightedDays, setHighlightedDays] = useState([]);

  // Date formatting
  const formattedDate = type === 'task' 
    ? `Due: ${item.formattedDate}`
    : startDate && endDate
      ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
      : startDate
        ? `Starts on: ${new Date(startDate).toLocaleDateString()}`
        : endDate
          ? `Ends on: ${new Date(endDate).toLocaleDateString()}`
          : "No date range provided";

  useEffect(() => {
    if (type !== 'post') return;
    
    const generateHighlightedDates = () => {
      if (!startDate || !endDate) return randomDates || [];
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      let current = start;
      const generatedWeeklyDates = [];

      while (current.isBefore(end) || current.isSame(end)) {
        const dayOfWeek = weekdays[current.day()];
        if (weeklyDays?.includes(dayOfWeek)) {
          generatedWeeklyDates.push(current.format("YYYY-MM-DD"));
        }
        current = current.add(1, "day");
      }

      return Array.from(new Set([...generatedWeeklyDates, ...(randomDates || [])]));
    };

    setHighlightedDays(generateHighlightedDates());
  }, [startDate, endDate, weeklyDays, randomDates, type]);

  const ServerDay = (props) => {
    const { day, highlightedDays = [], ...other } = props;
    const formattedDate = dayjs(day).format("YYYY-MM-DD");
    const isSelected = highlightedDays.includes(formattedDate);

    return (
      <PickersDay
        {...other}
        day={day}
        sx={{
          backgroundColor: isSelected ? "red" : undefined,
          color: isSelected ? "white" : undefined,
          "&:hover": {
            backgroundColor: isSelected ? "darkred" : undefined,
          },
          borderRadius: isSelected ? "50%" : undefined,
        }}
      />
    );
  };

  const handleJoinNow = async () => {
    try {
      const response = await axios.put("http://localhost:8000/join-team", {
        email: auth.user.email,
        postId: item.id,
      });

      if (response.status === 200) {
        alert("You have successfully joined the team!");
      }
    } catch (error) {
      console.error("Error joining the team:", error);
      alert("Failed to join the team. Please try again.");
    }
  };

  return (
    <div className="description__container">
      <div className="description__header">
        <div className="event__summary">
          <h2>
            {type === 'task' && <FaTasks style={{ marginRight: '10px' }} />}
            {title || "No Title Available"}
          </h2>
          <div className="event__details">
            <p>
              <BsCalendar2Date className="description__icon" />
              <strong>{type === 'task' ? 'Due Date' : 'Date'}:</strong> {formattedDate}
            </p>
            {type === 'post' && (
              <>
                <p>
                  <IoTimeOutline className="description__icon" />
                  <strong>Time:</strong> {startTime && endTime 
                    ? `${dayjs(`1970-01-01 ${startTime}`).format("hh:mm A")} - ${dayjs(`1970-01-01 ${endTime}`).format("hh:mm A")}`
                    : "No time provided"}
                </p>
                <p>
                  <IoLocationOutline className="description__icon" />
                  <strong>Location:</strong> {location || "No location provided"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {type === 'post' && (
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={null}
              slots={{ day: ServerDay }}
              slotProps={{
                day: { highlightedDays },
              }}
            />
          </LocalizationProvider>
        </div>
      )}

      <div className="description__body">
        <p>{description || "No description available."}</p>
      </div>

      {type === 'post' && auth?.roles?.includes(2001) && (
        <div className="action__button">
          <button onClick={handleJoinNow}>Join Now</button>
        </div>
      )}
    </div>
  );
};

export default Description;