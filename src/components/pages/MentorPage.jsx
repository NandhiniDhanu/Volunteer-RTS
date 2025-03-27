import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [report, setReport] = useState('');
  const [hours, setHours] = useState(0);

  const handleSignOut = () => {
    // Handle sign out logic here
    navigate('/login');
  };

  const handleSubmitNotes = (e) => {
    e.preventDefault();
    // Handle notes submission logic here
    console.log('Notes submitted:', notes);
    setNotes('');
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    // Handle report submission logic here
    console.log('Report submitted:', report);
    setReport('');
  };

  const handleSubmitHours = (e) => {
    e.preventDefault();
    // Handle hours submission logic here
    console.log('Hours submitted:', hours);
    setHours(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mentor Dashboard</h1>
      
      {/* Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Notes for TA</h2>
        <form onSubmit={handleSubmitNotes}>
          <textarea
            className="w-full p-2 border rounded-md mb-4"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Notes
          </button>
        </form>
      </div>

      {/* Report Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Submit Report</h2>
        <form onSubmit={handleSubmitReport}>
          <textarea
            className="w-full p-2 border rounded-md mb-4"
            rows="4"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Enter your report here..."
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Hours Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">View/Submit Hours</h2>
        <form onSubmit={handleSubmitHours}>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              className="p-2 border rounded-md"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter hours"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Submit Hours
            </button>
          </div>
        </form>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MentorPage; 