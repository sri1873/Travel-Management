// src/components/HotelBooking.jsx
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
    // Prepare booking data
    const bookingData = {
      checkInDate: bookingDetails.checkInDate,
      checkOutDate: bookingDetails.checkOutDate,
      numberOfGuests: bookingDetails.numberOfGuests,
      roomId: parseInt(roomId, 10), 
      hotelId: parseInt(hotelId, 10)// Pass the roomId to link to the correct room
    };

    console.log("Booking Data:", bookingData);
  
    // Send booking data to backend
    fetch('http://localhost:8080/api/bookings/createBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Booking successful!');
        navigate('/hotels'); // Redirect to home or hotel discovery page after booking
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        alert('Error booking room. Please try again later.');
      });
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
