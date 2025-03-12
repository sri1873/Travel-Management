import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/FlightDetails.css";

const FlightDetails = () => {
    const navigate = useNavigate();
    const flight = useSelector((state) => state.selectedFlight);
console.log(flight)
    return (
        <div className="flight-details-container">
            {/* Left Section - Flight Information */}
            <div className="left-section">
                <div className="flight-section">
                    <h2>Flight Details</h2>
                    <table className="flight-table">
                        <tbody>
                            <tr>
                                <td><b>Airline</b></td>
                                <td>{flight.airline}</td>
                            </tr>
                            <tr>
                                <td><b>From</b></td>
                                <td>{flight.from}</td>
                            </tr>
                            <tr>
                                <td><b>To</b></td>
                                <td>{flight.to}</td>
                            </tr>
                            <tr>
                                <td><b>Departure</b></td>
                                <td>{flight.departure}</td>
                            </tr>
                            <tr>
                                <td><b>Arrival</b></td>
                                <td>{flight.arrival}</td>
                            </tr>
                            <tr>
                                <td><b>Duration</b></td>
                                <td>{flight.duration}</td>
                            </tr>
                            <tr>
                                <td><b>Layovers</b></td>
                                <td>{flight.layover} ({flight.layoverDuration})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Baggage Details */}
                <div className="flight-section">
                    <h2>Baggage Details</h2>
                    <ul className="baggage-list">
                        <li>Carry-on: 1 bag (up to 7kg)</li>
                        <li>Checked Baggage: Up to 23kg</li>
                        <li>Additional baggage can be purchased</li>
                    </ul>
                </div>

                {/* General Info */}
                <div className="flight-section">
                    <h2>General Information</h2>
                    <p>Make sure to check in at least 2 hours before departure. Carry a valid ID and follow airline policies.</p>
                </div>
            </div>

            {/* Right Section - Billing & Booking */}
            <div className="right-section">
                <div className="flight-section billing">
                    <h2>Billing Summary</h2>
                    <table className="billing-table">
                        <tbody>
                            <tr>
                                <td>Base Fare:</td>
                                <td>${flight.price}</td>
                            </tr>
                            <tr>
                                <td>Taxes & Fees:</td>
                                <td>$30</td>
                            </tr>
                            <tr>
                                <td><b>Total Price:</b></td>
                                <td><b>${parseInt(flight.price) + 30}</b></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="button-container">
                        <button className="book-btn" onClick={() => navigate("/booking")}>
                            Proceed to Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;
