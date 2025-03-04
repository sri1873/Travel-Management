import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelAdminDashboard.css';

const TravelAdminDashboard = () => {
  const navigate = useNavigate();
  const [showFlightForm, setShowFlightForm] = useState(false);

  const toggleFlightForm = () => {
    setShowFlightForm(!showFlightForm);
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    alert("Flight details submitted!");
  };

  return (
    <div className="travel-admin-dashboard-container">
      <h2>Welcome to Travel Admin</h2>
      <p>Add flight details here.</p>
      <button onClick={toggleFlightForm}>
        {showFlightForm ? 'Hide Flight Form' : 'Show Flight Form'}
      </button>
      {showFlightForm && (
        <form onSubmit={handleFlightSubmit} className="flight-form">
          <div>
            <label>Flight Number:</label>
            <input type="text" name="flightNumber" required />
          </div>
          <div>
            <label>Departure:</label>
            <input type="text" name="departure" required />
          </div>
          <div>
            <label>Arrival:</label>
            <input type="text" name="arrival" required />
          </div>
          <div>
            <label>Date:</label>
            <input type="date" name="date" required />
          </div>
          <button type="submit">Submit Flight Details</button>
        </form>
      )}
    </div>
  );
};

export default TravelAdminDashboard;
