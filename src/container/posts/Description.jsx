import React, { useState, useEffect } from "react";
import "./description.css";
import { BsCalendar2Date } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import useAuth from "../../hooks/useAuth"; // Hook to get auth context
import axios from "axios";

const Description = ({ post }) => {
  if (!post) {
    return (
      <div className="description__container">
        <p className="description__placeholder">
          Select a post to see the details here.
        </p>
      </div>
    );
  }

  const { title, description, startDate, endDate, time, location, weeklyDays, randomDates } = post;

  // Format the start and end dates
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString()
    : "No start date provided";

  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString()
    : "No end date provided";

  // Combine the start and end dates into a single range
  const dateRange = startDate && endDate
    ? `${formattedStartDate} - ${formattedEndDate}`
    : startDate
    ? `Starts on: ${formattedStartDate}`
    : endDate
    ? `Ends on: ${formattedEndDate}`
    : "No date range provided";
  
  const { auth } = useAuth(); // Get current user info

  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    const generateHighlightedDates = () => {
      if (!startDate || !endDate) return randomDates || [];
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      let current = start;
      const generatedWeeklyDates = [];

      // Generate dates for weeklyDays
      while (current.isBefore(end) || current.isSame(end)) {
        const dayOfWeek = weekdays[current.day()];
        if (weeklyDays?.includes(dayOfWeek)) {
          generatedWeeklyDates.push(current.format("YYYY-MM-DD"));
        }
        current = current.add(1, "day");
      }

      // Combine weekly and random dates
      return Array.from(new Set([...generatedWeeklyDates, ...(randomDates || [])]));
    };

    setHighlightedDays(generateHighlightedDates());
  }, [startDate, endDate, weeklyDays, randomDates]);

  // Custom Day Component
  const ServerDay = (props) => {
    const { day, highlightedDays = [], ...other } = props;
    const formattedDate = dayjs(day).format("YYYY-MM-DD");
    const isSelected = highlightedDays.includes(formattedDate);

    return (
      <PickersDay
        {...other}
        day={day}
        sx={{
          backgroundColor: isSelected ? "red" : undefined, // Red for selected dates
          color: isSelected ? "white" : undefined, // White text for better contrast
          "&:hover": {
            backgroundColor: isSelected ? "darkred" : undefined, // Darker red on hover
          },
          borderRadius: isSelected ? "50%" : undefined, // Keep the circular shape
        }}
      />
    );
  };
  const handleJoinNow = async () => {
    try {
      const response = await axios.put("http://localhost:8000/join-team", {
        email: auth.user.email, // Current user's email
        postId: post.id, // Current post ID
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
          <h2>{title || "No Title Available"}</h2>
          <div className="event__details">
            <p>
              <BsCalendar2Date className="description__icon" />
              <strong>Date:</strong> {dateRange}
            </p>
            <p>
              <IoTimeOutline className="description__icon" />
              <strong>Time:</strong> {time || "No time provided"}
            </p>
            <p>
              <IoLocationOutline className="description__icon" />
              <strong>Location:</strong> {location || "No location provided"}
            </p>
          </div>
        </div>
      </div>
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
      <div className="description__body">
        <p>{description || "No description available."}</p>
      </div>
        <div className="action__button">
        {auth?.roles?.includes(2001) && (
          <button onClick={handleJoinNow}>Join Now</button>
        )}

        </div>
    </div>
  );
};

export default Description;
