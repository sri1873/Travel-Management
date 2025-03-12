import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './booking_history.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Booking History</h1>
            </div>

            <div className="itinerary_navbar">
                <p><Link to="/itinerary">Trip Packages</Link></p>
                <p><Link to="/activities">Plan Activities</Link></p>
                <p><Link to="/bookinghistory">Booking History</Link></p>
            </div>

            <div className="itinerary_packages_container">
                {bookings.length === 0 ? (
                    <p>No bookings yet. Explore and book your next adventure!</p>
                ) : (
                    <div className="packages_grid">
                        {bookings.map((booking, index) => (
                            <div className="package_card" key={index}>
                                <img src={booking.image} alt={booking.title} />
                                <h2>{booking.title}</h2>
                                <p>{booking.description}</p>
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Price:</strong> {booking.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;