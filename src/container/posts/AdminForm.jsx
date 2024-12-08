import React, { useState, useEffect } from "react";
import "./adminform.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

const AdminForm = ({ onClose, onSubmit }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    location: "",
    weeklyDays: [], // Selected weekdays
    startDate: null,
    endDate: null,
    startTime: "", // Start time
    endTime: "", // End time
    randomDates: [], // Random dates selected on the calendar
  });

  const [highlightedDays, setHighlightedDays] = useState([]); // All highlighted dates (weekly + random)
  const [excludedDates, setExcludedDates] = useState([]); // Dates excluded from weekly highlights

  // Generate weekly and random dates, excluding specific dates, whenever relevant fields change
  useEffect(() => {
    const generateHighlightedDates = () => {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const start = dayjs(newPost.startDate);
      const end = dayjs(newPost.endDate);

      // Validate start and end dates
      if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
        return [...newPost.randomDates]; // Only use random dates if no valid range
      }

      // Generate dates for weeklyDays
      let current = start;
      const generatedWeeklyDates = [];

      while (current.isBefore(end) || current.isSame(end)) {
        const dayOfWeek = weekdays[current.day()];
        if (newPost.weeklyDays.includes(dayOfWeek)) {
          const formattedDate = current.format("YYYY-MM-DD");
          if (!excludedDates.includes(formattedDate)) {
            generatedWeeklyDates.push(formattedDate);
          }
        }
        current = current.add(1, "day");
      }

      // Combine random and weekly dates, ensuring no duplicates
      const combinedDates = Array.from(new Set([...generatedWeeklyDates, ...newPost.randomDates]));
      return combinedDates;
    };

    setHighlightedDays(generateHighlightedDates());
  }, [newPost.weeklyDays, newPost.startDate, newPost.endDate, newPost.randomDates, excludedDates]);

  // Handle calendar day click for adding/removing random dates or exclusions
  const handleCalendarClick = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const isAlreadyHighlighted = highlightedDays.includes(formattedDate);

    if (isAlreadyHighlighted) {
      // If highlighted, add to exclusions or remove from random dates
      if (newPost.randomDates.includes(formattedDate)) {
        setNewPost((prev) => ({
          ...prev,
          randomDates: prev.randomDates.filter((d) => d !== formattedDate),
        }));
      } else {
        setExcludedDates((prev) => [...prev, formattedDate]); // Add to exclusions
      }
    } else {
      // Add as a random date if not already highlighted
      setNewPost((prev) => ({
        ...prev,
        randomDates: [...prev.randomDates, formattedDate],
      }));
    }
  };

  // Handle Weekly Days Checkbox
  const handleWeeklyDayChange = (day) => {
    const isAlreadySelected = newPost.weeklyDays.includes(day);
    if (isAlreadySelected) {
      // Remove the day and also clear any exclusions for that day
      setNewPost((prev) => ({
        ...prev,
        weeklyDays: prev.weeklyDays.filter((d) => d !== day),
      }));
      setExcludedDates((prev) => prev.filter((date) => !isDateInDayOfWeek(date, day)));
    } else {
      // Add the day back and reset exclusions for that day
      setNewPost((prev) => ({
        ...prev,
        weeklyDays: [...prev.weeklyDays, day],
      }));
      setExcludedDates((prev) => prev.filter((date) => !isDateInDayOfWeek(date, day)));
    }
  };

  // Utility: Check if a date corresponds to a specific day of the week
  const isDateInDayOfWeek = (date, day) => {
    const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
    return dayjs(date).day() === dayIndex;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newPost.title || !newPost.description || !newPost.location) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formattedPost = {
      ...newPost,
      startTime: dayjs(newPost.startTime, "HH:mm").format("hh:mm A"),
      endTime: dayjs(newPost.endTime, "HH:mm").format("hh:mm A"),
    };
  
    onSubmit(formattedPost); // Send the formatted post with AM/PM times
  };
  

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
          backgroundColor: isSelected ? "red" : undefined,
          color: isSelected ? "white" : undefined,
          borderRadius: isSelected ? "50%" : undefined,
        }}
      />
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add a New Post</h2>
        <form className="add-post-form" onSubmit={handleSubmit}>
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={newPost.location}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, location: e.target.value }))
            }
            required
          />

          {/* Weekly Days */}
          <div className="weekly-days">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
              (day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={newPost.weeklyDays.includes(day)}
                    onChange={() => handleWeeklyDayChange(day)}
                  />
                  {day}
                </label>
              )
            )}
          </div>

          {/* Start and End Date */}
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={newPost.startDate || ""}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              value={newPost.endDate || ""}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>

          {/* Calendar */}
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={null}
                onChange={handleCalendarClick}
                slots={{ day: ServerDay }}
                slotProps={{
                  day: { highlightedDays },
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label>Start Time</label>
              <input
                type="time"
                value={newPost.startTime ? dayjs(newPost.startTime, "hh:mm A").format("HH:mm") : ""}
                onChange={(e) => {
                  const formattedTime = dayjs(e.target.value, "HH:mm").format("hh:mm A");
                  setNewPost((prev) => ({ ...prev, startTime: formattedTime }));
                }}
                required
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="time"
                value={newPost.endTime ? dayjs(newPost.endTime, "hh:mm A").format("HH:mm") : ""}
                onChange={(e) => {
                  const formattedTime = dayjs(e.target.value, "HH:mm").format("hh:mm A");
                  setNewPost((prev) => ({ ...prev, endTime: formattedTime }));
                }}
                required
              />
          </div>
          {/* Buttons */}
          <button type="submit" className="btn">
            Add Post
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
