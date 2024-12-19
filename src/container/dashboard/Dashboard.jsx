import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Cards } from '../../components';
import { MdAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth"; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests
import ScheduleDashboard from './scheduleDashboard';
const Dashboard = () => {
  const { auth } = useAuth(); // Retrieve the authenticated user
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const [date, setDate] = useState(dayjs());
  const [userPosts, setUserPosts] = useState([]); // State for storing user's posts
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts associated with the user's team
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/posts", {
          params: { email: auth?.user?.email }, // Pass the user's email
        });
        console.log("Fetched events:", response.data); // Debugging line
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (auth?.user?.email) {
      fetchUserPosts();
    }
  }, [auth?.user?.email]);

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
          {/* Pass fetched user posts to Cards */}
          <Cards data={userPosts} variant="slider" />
        </div>
        <div className='information__container'>
          <div className='tasks__container'>

          </div>
          <div className='analytics__container'></div>
        </div>
      </div>
      <div className='schedule__container'>
        <ScheduleDashboard userEmail={auth?.user?.email} userPosts={userPosts} />
      </div>
    </div>
  );
};

export default Dashboard;
