// src/components/HotelBooking.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get room id
import './HotelBooking.css';

const HotelBooking = () => {
  const { hotelId, roomId } = useParams(); // Extract hotelId and roomId from the URL
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  useEffect(() => {
    // Fetch room details using hotelId and roomId from backend
    fetch(`http://localhost:8080/api/rooms/${roomId}`)
      .then((response) => response.json())
      .then((data) => setRoom(data))
      .catch((error) => console.error('Error fetching room details:', error));
  }, [roomId]);

  const handleBooking = () => {
    // Handle booking logic (you can add more details like user info, payment here)
    alert('Booking successful!');
    navigate('/'); // Redirect to home or hotel discovery page after booking
  };

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="hotel-booking">
      <h2>Booking for {room.type} </h2>
      <p><strong>Price:</strong> ${room.price} per night</p>
      <p>Pay on arrival</p>

      <div className="booking-form">
        <label>Check-in Date:</label>
        <input
          type="date"
          value={bookingDetails.checkInDate}
          onChange={(e) => setBookingDetails({ ...bookingDetails, checkInDate: e.target.value })}
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          value={bookingDetails.checkOutDate}
          onChange={(e) => setBookingDetails({ ...bookingDetails, checkOutDate: e.target.value })}
        />

        <label>Number of Guests:</label>
        <input
          type="number"
          min="1"
          value={bookingDetails.numberOfGuests}
          onChange={(e) => setBookingDetails({ ...bookingDetails, numberOfGuests: e.target.value })}
        />

        <button onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default HotelBooking;
