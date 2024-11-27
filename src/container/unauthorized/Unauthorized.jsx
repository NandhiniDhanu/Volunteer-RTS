import React from 'react';
import { useNavigate } from 'react-router-dom';
import './unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="unauthorized__container">
      <h1 className="unauthorized__title">403 - Unauthorized</h1>
      <p className="unauthorized__message">
        You do not have permission to access this page.
      </p>
      <button className="unauthorized__button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
