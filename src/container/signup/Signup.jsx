import React, { useState } from 'react';
import "./signup.css";
import { assets } from '../../assets/assets';
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    marketingEmails: false,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.terms) {
      alert('You must agree to the terms and conditions to sign up.');
      return;
    }
  
    console.log("Submitting data:", formData); // Debugging log
  
    try {
      const response = await axios.post("http://localhost:8000/register", formData);
      alert(response.data.message || "Sign up successful!");
    } catch (err) {
      console.error("Error during signup:", err.response?.data || err.message); // Log error details
      alert(err.response?.data?.message || "Error during signup");
    }
  };
  

  return (
    <section className="signup-form">
      <img src={assets.tamilSchoolIcon} alt="TamilSchoolIcon" className='login-tamil-school-icon' />
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Your Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Your last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="terms-checkbox"
            />
            <h4>
              I agree to the <a href="/terms" className="terms-link">terms and conditions</a>
            </h4>
          </label>
        </div>

        <button type="submit" className="submit-button">
          Sign up
        </button>
      </form>

      <p>
        Already have an account? <a href="/login">Log in to your account</a>
      </p>
    </section>
  );
};

export default Signup;
