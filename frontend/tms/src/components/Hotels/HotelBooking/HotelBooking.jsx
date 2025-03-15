import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom, setBookingDetails, setLoading, setError, setBookingStatus } from '../../../store/hotelBookingSlice';
import './HotelBooking.css';

const HotelBooking = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { room, bookingDetails, loading, error, bookingStatus } = useSelector(
    (state) => state.hotelBooking
  );

  useEffect(() => {
    // Fetch room details using roomId from backend
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/api/rooms/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setRoom(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError('Error fetching room details'));
        dispatch(setLoading(false));
      });
  }, [roomId, dispatch]);

  const handleBooking = () => {
    const bookingData = {
      checkInDate: bookingDetails.checkInDate,
      checkOutDate: bookingDetails.checkOutDate,
      numberOfGuests: bookingDetails.numberOfGuests,
      roomId: parseInt(roomId, 10),
      hotelId: parseInt(hotelId, 10),
    };

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
        dispatch(setBookingStatus('Booking successful!'));
        alert('Booking successful!');
        navigate('/hotels');
      })
      .catch((error) => {
        dispatch(setBookingStatus('Error booking room. Please try again later.'));
        alert('Error booking room. Please try again later.');
      });
  };

  const handleBookingDetailChange = (e) => {
    dispatch(setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <p>Loading room details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!room) {
    return <p>No room found.</p>;
  }

  return (
    <div className="hotel-booking-container">
      <div className="hotel-booking">
        <h2>Booking for {room.type}</h2>
        <p><strong>Price:</strong> ${room.price} per night</p>
        <p>Pay on arrival</p>

        <div className="booking-form">
          <label>Check-in Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={bookingDetails.checkInDate}
            onChange={handleBookingDetailChange}
          />

          <label>Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={bookingDetails.checkOutDate}
            onChange={handleBookingDetailChange}
          />

          <label>Number of Guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            min="1"
            value={bookingDetails.numberOfGuests}
            onChange={handleBookingDetailChange}
          />

          <button onClick={handleBooking}>Confirm Booking</button>
        </div>

        {/* Display booking status if exists */}
        {bookingStatus && <p>{bookingStatus}</p>}
      </div>
    </div>
  );
};

export default HotelBooking;
