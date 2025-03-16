import React, { useEffect, useState } from "react";
import "./booking_history.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBookingHistory } from "../../store/itineraryBookingSlice";

const BookingHistory = () => {
    const dispatch = useDispatch();
    const bookingHistory = useSelector((state) => state.bookings);
    const [bookingState, setBookings] = useState([]);
    useEffect(() => {
        if (bookingHistory.bookings.length === 0) {
            axios.get("http://localhost:8081/api/bookings")
                .then((response) => {
                    dispatch(setBookingHistory(response.data));
                    setBookings(response.data);
                })
                .catch((error) => console.error("Error fetching trip packages:", error));
        } else {
            setBookings(bookingHistory.bookings);
        }
    }, []);

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Booking History</h1>
            </div>

            <div className="bookings_container">
                {bookingState.length === 0 ? (
                    <p>No bookings yet. Explore and book your next adventure!</p>
                ) : (
                    <div className="booking_grid">
                        {bookingState.map((booking) => (
                            <div className="booking_card" key={booking.id}>
                                <img src={`src/assets/itinerary_assets/${booking.image}`} alt={booking.title} />
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
