import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FlightDetails.css";

const FlightDetails = () => {
    const navigate = useNavigate();
    const flight = { airline: "AirX", price: "$250", duration: "3h 45m", time: "10:30 AM" };

    return (
        <div className="details-container">
            <h2>Flight Details</h2>
            <p><b>Airline:</b> {flight.airline}</p>
            <p><b>Departure Time:</b> {flight.time}</p>
            <p><b>Duration:</b> {flight.duration}</p>
            <p><b>Price:</b> {flight.price}</p>
            <button onClick={() => navigate("/booking")}>Book Now</button>
        </div>
    );
};

export default FlightDetails;
