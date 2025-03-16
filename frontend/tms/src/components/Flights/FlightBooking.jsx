import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FlightBooking.css";
import axios from "axios";
import { useSelector } from "react-redux";

const FlightBooking = () => {
    const navigate = useNavigate();
    const searchDetails = useSelector((state) => state.flight);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/bookings", searchDetails)
            .then(console.log("Booking Successful!"))
            .catch(err => { console.log(err) });

        navigate("/confirmation")
    }

    return (
        <div className="booking-container">
            <h2>Enter Passenger Details</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );
};

export default FlightBooking;
