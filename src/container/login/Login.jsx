import React, { useState } from 'react';
import './Login.css';
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { assets } from '../../assets/assets';
import axios from "axios";
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
        const response = await axios.post("http://localhost:8000/login", { email, password });
        const { user } = response.data; // Extract user data
        const roles = user.roles; // Extract roles

        setAuth({
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            roles: user.roles,
        });

        console.log("Roles:", roles); // Debugging log

        // Redirect to the intended page (from) or the default role-based path
        navigate(from || defaultPath(roles), { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
    }
};

const defaultPath = (roles) => {
  if (roles.includes(5150)) return "/admin_dashboard"; // Admin role
  if (roles.includes(2001)) return "/dashboard"; // User role
  return "/unauthorized"; // Fallback for unhandled roles
};


  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={assets.tamilSchoolIcon} alt="TamilSchoolIcon" className='login-tamil-school-icon' />
        <div className='login-form-title-row'>
          <h2>Sign In</h2>
          <div className="social-icons">
            <FaGoogle size={24} />
            <FaApple size={24} />
            <FaFacebook size={24} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn sign-in-btn">Sign In</button>
        </form>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" className='remember-forgot-checkbox' />
            Remember Me
          </label>
          <Link className="login-forgotpassword" to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <div className="login-welcome">
        <h2>Welcome to RTS Volunteers</h2>
        <p>Don't have an account?</p>
        <button className="btn sign-up-btn" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
