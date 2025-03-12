import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FlightBooking.css";

const FlightBooking = () => {
    const navigate = useNavigate();

    return (
        <div className="booking-container">
            <h2>Enter Passenger Details</h2>
            <form onSubmit={() => navigate("/confirmation")}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );
};

export default FlightBooking;
