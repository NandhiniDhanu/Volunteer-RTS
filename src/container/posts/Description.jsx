import React from 'react';
import './description.css';
import { BsCalendar2Date } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const Description = ({ post }) => {
  // Placeholder data for now
  const selectedPost = post || {
    title: "Volunteer Opportunity 1",
    description: "Help clean up the park on Saturday.",
    date: "11/25/2024",
    time: "10:00 AM",
    location: "Central Park",
  };

  return (
    <div className="description__container">
      <div className="description__header">
        <div className="event__summary">
          <h2>{selectedPost.title}</h2>
          <div className="event__details">
          <p>
              <BsCalendar2Date className="description__icon" />
              <strong>Date:</strong> {selectedPost.date}
            </p>
            <p>
              <IoTimeOutline className="description__icon" />
              <strong>Time:</strong> {selectedPost.time}
            </p>
            <p>
              <IoLocationOutline className="description__icon" />
              <strong>Location:</strong> {selectedPost.location}
            </p>
          </div>
        </div>
      </div>
      <div className="description__body">
        <p>{selectedPost.description}</p>
      </div>
      <div className="action__button">
        <button>Join Now</button>
      </div>
    </div>
  );
};

export default Description;
