import React from 'react';
import PropTypes from 'prop-types';
import './TaskDescription.css';

const TaskDescription = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCheckIn = () => {
    console.log('Check In button clicked');
    onClose();
  };

  const handleDecline = () => {
    console.log('Decline button clicked');
    onClose();
  };

  return (
    <div className="task-description-overlay">
      <div className="task-description-modal">
        <div className="task-description-content">
          <h2>Task Description</h2>
          <p>
            This is a sample task description. The actual task description will be populated 
            when the parent component is implemented. This text serves as a placeholder to 
            demonstrate the layout and styling of the component.
          </p>
          <div className="task-description-buttons">
            <button 
              className="check-in-btn"
              onClick={handleCheckIn}
            >
              Check In
            </button>
            <button 
              className="decline-btn"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskDescription.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TaskDescription; 