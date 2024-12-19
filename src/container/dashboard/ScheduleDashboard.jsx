import React, { useState, useEffect } from "react";
import axios from "axios";
import "./scheduleDashboard.css";

const ScheduleDashboard = ({ userEmail, userPosts }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [teamColors, setTeamColors] = useState({});

  useEffect(() => {
    if (!userPosts || userPosts.length === 0) {
      setScheduleData([]); // Handle empty posts gracefully
      return;
    }

    const colors = assignColors(userPosts);
    setTeamColors(colors);

    const processedData = generateSchedule(userPosts, colors);
    setScheduleData(processedData);
  }, [userPosts]);

  const assignColors = (posts) => {
    const teams = [...new Set(posts.map((post) => post.title))];
    return teams.reduce((acc, team) => {
      acc[team] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      return acc;
    }, {});
  };

  const generateSchedule = (posts, colors) => {
    const result = {};
    posts.forEach((post) => {
      // Process randomDates
      (post.randomDates || []).forEach((date) => {
        if (!result[date]) result[date] = [];
        result[date].push({
          time: post.startTime,
          category: post.title,
          task: post.description,
          color: colors[post.title],
        });
      });

      // Process weeklyDays
      if (post.weeklyDays && post.startDate && post.endDate) {
        const startDate = new Date(post.startDate);
        const endDate = new Date(post.endDate);

        let currentDate = startDate;
        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "long" });
          if (post.weeklyDays.includes(dayOfWeek)) {
            const dateKey = currentDate.toISOString().split("T")[0];
            if (!result[dateKey]) result[dateKey] = [];
            result[dateKey].push({
              time: post.startTime,
              category: post.title,
              task: post.description,
              color: colors[post.title],
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    return Object.keys(result)
      .sort()
      .map((date) => ({
        date,
        events: result[date],
      }));
  };

  return (
    <div className="schedule-dashboard">
      <h2 className="dashboard-title">Calendar</h2>
      <div className="schedule-scroll">
        {scheduleData.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          scheduleData.map((day, index) => (
            <div key={index} className="schedule-day">
              <h3 className="date">{day.date}</h3>
              {day.events.map((event, idx) => (
                <div key={idx} className="event">
                  <div className="time">{event.time}</div>
                  <div className="details">
                    <div className="line" style={{ backgroundColor: event.color }}></div>
                    <div className="text">
                      <span className="category">{event.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleDashboard;
