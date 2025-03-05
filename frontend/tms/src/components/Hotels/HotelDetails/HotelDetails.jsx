// src/components/HotelDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useNavigate for back button
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // Fetch hotel details from the backend
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => setHotel(data))
      .catch((error) => console.error('Error fetching hotel details:', error));
  }, [id]);

  if (!hotel) {
    return <p>Loading hotel details...</p>;
  }

  return (
    <div className="hotel-details-container">

      {/* Hotel Details */}
      <div className="hotel-details">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Description:</strong> {hotel.description}</p>
        <p><strong>Price per Night:</strong> ${hotel.pricePerNight}</p>
        <p><strong>Rooms Available:</strong> {hotel.rooms.length}</p>

        {/* Available Rooms */}
        <div className="room-list">
          <h3>Available Rooms</h3>
          {hotel.rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h4>{room.type}</h4>
              <p><strong>Price:</strong> ${room.price} per night</p>
              <p><strong>Available:</strong> {room.available}</p>
              {room.available > 0 && (
                <Link to={`/booking/${hotel.id}/${room.id}`}>
                  <button>Book Now</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
