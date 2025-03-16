import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import FlightForm from './FlightForm';
import "./styles/flightHome.css";

const FlightHome = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/flights-search");
    };

    return (
        <div className="flight-home-container">
            <div className="flight-info-container">
                <div className="flight-hero-content">
                    <h1>
                        Welcome to <span className="highlight-text">Flight Surfer</span> by TMS
                    </h1>
                    <p>Your gateway to seamless and affordable travel.</p>
                </div>
                <FlightForm handleNavigate={handleNavigate} />
            </div>

            <div className="flight-pics">
                <div className="pic-1"></div>
                <div className="pic-2"></div>
                <div className="pic-3"></div>
            </div>
        </div>
    );
};

export default FlightHome;
