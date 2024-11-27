import React from "react";
import "./adminDashboard.css";

const Members = ({ currentRows, totalPages, currentPage, handlePageClick }) => {
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
              <th>Volunteering Teams</th>
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
