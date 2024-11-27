import React from 'react';
import './description.css';
import { BsCalendar2Date } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const Description = ({ post }) => {
  // Show a message if no post is selected
  if (!post) {
    return (
      <div className="description__container">
        <p className="description__placeholder">Select a post to see the details here.</p>
      </div>
    );
  }

  // Safely destructure post properties
  const { title, description, date, time, location } = post;

  return (
    <div className="description__container">
      <div className="description__header">
        <div className="event__summary">
          <h2>{title || "No Title Available"}</h2>
          <div className="event__details">
            <p>
              <BsCalendar2Date className="description__icon" />
              <strong>Date:</strong> {date || "No date provided"}
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
      <div className="description__body">
        <p>{description || "No description available."}</p>
      </div>
      <div className="action__button">
        <button>Join Now</button>
      </div>
    </div>
  );
};

export default Description;
