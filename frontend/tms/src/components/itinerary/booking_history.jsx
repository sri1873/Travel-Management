import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./booking_history.css";
import { loadBookings } from "../../store/itineraryBookingSlice";

const BookingHistory = () => {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.bookingHistory);

    useEffect(() => {
        dispatch(loadBookings());
    }, [dispatch]);

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Booking History</h1>
            </div>

            <div className="bookings_container">
                {bookings.length === 0 ? (
                    <p>No bookings yet. Explore and book your next adventure!</p>
                ) : (
                    <div className="booking_grid">
                        {bookings.map((booking) => (
                            <div className="booking_card" key={booking.id}>
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
