import React from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { 
  BsLayoutWtf, 
  BsSearch, 
  BsFillBarChartFill, 
  BsEnvelope, 
  BsGear, 
  BsPersonCircle 
} from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios'; // Ensure axios is imported

const Navbar = () => {
  const { tamilSchoolIcon } = assets;
  const { auth, setAuth } = useAuth(); // Access auth context to get user roles
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        setAuth(null); // Clear auth context
        axios.defaults.headers.common["Authorization"] = null; // Clear token
        navigate("/login", { replace: true, state: null });
    }
};


const handleDashboardClick = () => {
  // Check user roles and navigate accordingly
  if (auth?.roles?.includes(5150)) {
      navigate('/admin_dashboard'); // Admin role
  } else if (auth?.roles?.includes(2001)) {
      navigate('/dashboard'); // User role
  } else {
      navigate('/unauthorized'); // If roles don't match, redirect to unauthorized
  }
};

  const handlePostsClick = () => {
    navigate('/posts');
  };

  return (
    <div className="navbar__container">
      <div className="navbar__style">
        <div className="navbar__logo">
          <img src={tamilSchoolIcon} alt="Tamil School Logo" className="logo" />
        </div>
        <div className="navbar__tabs">
          <div className="Dashboard__icon" onClick={handleDashboardClick}>
            <BsLayoutWtf className="icon" />
          </div>
          <div className="job__icon" onClick={handlePostsClick}>
            <BsSearch className="icon" />
          </div>
          <div className="analytics__icon">
            <BsFillBarChartFill className="icon" />
          </div>
          <div className="mail__icon">
            <BsEnvelope className="icon" />
          </div>
          <div className="setting__icon">
            <BsGear className="icon" />
          </div>
        </div>

        {/* Bottom Buttons Section */}
        <div className="navbar__bottom__Buttons">
          <BsPersonCircle className="icon" />
          <IoIosLogOut className="icon" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
