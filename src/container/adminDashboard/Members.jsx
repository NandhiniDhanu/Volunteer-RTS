import React from "react";
import Papa from "papaparse"; // Importing Papa for CSV generation
import "./adminDashboard.css";
import { FaDownload } from "react-icons/fa";
<FaDownload />
const Members = ({ currentRows, totalPages, currentPage, handlePageClick, usersData }) => {
  // Logic to compute the range of numbers to display
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2); // Start at two pages before the current page
    let endPage = Math.min(totalPages, currentPage + 2); // End at two pages after the current page

    // Adjust range if near the start or end of the total pages
    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage > totalPages - 3) {
      startPage = Math.max(totalPages - 4, 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${
            currentPage === i ? "active-page" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  // Function to export all table data as CSV
  const exportAllToCSV = () => {
    const csvData = usersData.map((row) => ({
      "First Name": row.firstName,
      "Last Name": row.lastName,
      Email: row.email,
      "Hours Completed": row.hoursCompleted,
      Absences: row.absences,
      Present: row.present,
      "Volunteering Teams": row.volunteeringTeams,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const timestamp = new Date().toISOString().slice(0, 19).replace("T", "_");
    link.download = `users_data_${timestamp}.csv`;
    link.click();
  };

  return (
    <div>
      {/* Members Table */}
      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Hours Completed</th>
              <th>Absences</th>
              <th>Present</th>
              <th>
                Volunteering Teams
                <FaDownload
                  onClick={exportAllToCSV}
                  className="download-icon"
                  title="Export to CSV"
                  style={{
                    marginLeft: "50px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "red"
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.email}</td>
                <td>{row.hoursCompleted}</td>
                <td>{row.absences}</td>
                <td>{row.present}</td>
                <td>{row.volunteeringTeams}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          {/* Prev Button */}
          <div className="pagination-prev">
            <button
              className="pagination-button"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </div>

          {/* Dynamic Page Numbers */}
          <div className="pagination-numbers">{renderPageNumbers()}</div>

          {/* Next Button */}
          <div className="pagination-next">
            <button
              className="pagination-button"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
