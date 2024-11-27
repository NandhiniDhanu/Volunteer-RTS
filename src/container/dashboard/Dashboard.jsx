import React, { useState } from 'react';
import "./dashboard.css";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Cards } from '../../components';
import { MdAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth"; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useAuth(); // Retrieve the authenticated user
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const [date, setDate] = useState(dayjs());
  const navigate = useNavigate();

  const cardData = [
    { id: 1, title: "Job Title 1", description: "A job ", date: "10/25/21" },
    { id: 1, title: "Job Title 2", description: "A job description is a written document that provides a detailed overview of a job role, including its responsibilities, tasks, qualifications, and expectations.", date: "10/26/21" },
    { id: 1, title: "Job Title 3", description: "A job description is a written document that provides a detailed overview of a job role, including its responsibilities, tasks, qualifications, and expectations.", date: "10/26/21" },
    { id: 1, title: "Job Title 4", description: "A job description is a written document that provides a detailed overview of a job role, including its responsibilities, tasks, qualifications, and expectations.", date: "10/26/21" },
  ];

  const addPost = () => {
    navigate('/posts');
  };

  return (
    <div className='dashboard__container'>
      <div className='general__container'>
        <div className='header__container'>
          <div className='header__row'>
            <div className='header__title'>
              <h1>Welcome, {auth?.user?.firstName || "Admin"}</h1>
              <div className='formattedDate__background'>
                <h4>Today is {formattedDate}</h4>
              </div>
            </div>
            <button className="addJob__button" onClick={addPost} aria-label="Add Post">
              <MdAdd className="add-icon" />
            </button>
          </div>
        </div>
        <div className='volunteer__container'>
          <Cards data={cardData} variant="slider" />
        </div>
        <div className='information__container'>
          <div className='tasks__container'></div>
          <div className='analytics__container'></div>
        </div>
      </div>
      <div className='schedule__container'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{
              '.Mui-selected': {
                backgroundColor: 'red !important',
                color: 'white !important',
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Dashboard;
