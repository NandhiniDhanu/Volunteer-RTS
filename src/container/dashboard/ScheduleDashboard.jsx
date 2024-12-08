import React from 'react';
import './scheduleDashboard.css';

const ScheduleDashboard = () => {
  const scheduleData = [
    {
      date: 'Oct 20, 2021',
      events: [
        { time: '10:00', category: 'Dribbble Shot', task: 'Facebook Brand', color: '#00C1D4' },
        { time: '13:20', category: 'Design', task: 'Task Management', color: '#FFA500' },
      ],
    },
    {
      date: 'Oct 21, 2021',
      events: [
        { time: '10:00', category: 'UX Research', task: 'Sleep App', color: '#9B51E0' },
        { time: '13:20', category: 'Design', task: 'Task Management', color: '#FFA500' },
        { time: '10:00', category: 'Dribbble Shot', task: 'Meet Up', color: '#00C1D4' },
      ],
    },
    {
      date: 'Oct 22, 2021',
      events: [
        { time: '10:00', category: 'Dribbble Shot', task: 'Meet Up', color: '#00C1D4' },
        { time: '11:00', category: 'Design', task: 'Mobile App', color: '#FFA500' },
      ],
    },
    {
      date: 'Oct 22, 2021',
      events: [
        { time: '10:00', category: 'Dribbble Shot', task: 'Meet Up', color: '#00C1D4' },
        { time: '11:00', category: 'Design', task: 'Mobile App', color: '#FFA500' },
      ],
    },
    {
      date: 'Oct 22, 2021',
      events: [
        { time: '10:00', category: 'Dribbble Shot', task: 'Meet Up', color: '#00C1D4' },
        { time: '11:00', category: 'Design', task: 'Mobile App', color: '#FFA500' },
      ],
    },
  ];

  return (
    <div className="schedule-dashboard">
      <h2 className="dashboard-title">Calendar</h2>
      <div className="schedule-scroll">
        {scheduleData.map((day, index) => (
          <div key={index} className="schedule-day">
            <h3 className="date">{day.date}</h3>
            {day.events.map((event, idx) => (
              <div key={idx} className="event">
                <div className="time">{event.time}</div>
                <div className="details">
                  <div
                    className="line"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="text">
                    <span className="category">{event.category}</span>
                    <span className="task">{event.task}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDashboard;
