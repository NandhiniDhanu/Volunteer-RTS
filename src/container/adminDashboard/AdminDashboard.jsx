import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Members from "./Members";
import Info from "./Info";
import Requests from "./Requests";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Import the useAuth hook

const AdminDashboard = () => {
  const { auth } = useAuth(); // Retrieve the authenticated user
  const [usersData, setUsersData] = useState([]); // State to store users
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch users data from the backend

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin_dashboard");
        const enhancedData = response.data.map((user, index) => ({
          
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          hoursCompleted: Math.floor(Math.random() * 100), // Placeholder value
          absences: Math.floor(Math.random() * 10), // Placeholder value
          present: Math.floor(Math.random() * 100), // Placeholder value
          volunteeringTeams: user.volunteeringTeams, 
        }));
        setUsersData(enhancedData);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = usersData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(usersData.length / rowsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const [activeTab, setActiveTab] = useState("Info");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Info":
        return <Info />;
      case "Members":
        return (
          <Members
            currentRows={currentRows}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        );
      case "Requests":
        return <Requests />;
      default:
        return <Info />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Hello, {auth?.user?.firstName || "Admin"}</h1>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === "Info" ? "active" : ""}`}
          onClick={() => setActiveTab("Info")}
        >
          Info
        </button>
        <button
          className={`tab-button ${activeTab === "Members" ? "active" : ""}`}
          onClick={() => setActiveTab("Members")}
        >
          Members
        </button>
        <button
          className={`tab-button ${activeTab === "Requests" ? "active" : ""}`}
          onClick={() => setActiveTab("Requests")}
        >
          Requests
        </button>
      </div>

      {renderActiveTab()}
    </div>
  );
};

export default AdminDashboard;
