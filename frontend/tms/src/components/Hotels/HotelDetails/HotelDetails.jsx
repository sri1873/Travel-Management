import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    // Fetch hotel details from the backend
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => setHotel(data))
      .catch((error) => console.error('Error fetching hotel details:', error));

    // Fetch reviews for the hotel
    fetch(`http://localhost:8080/api/hotels/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [id]);

  // Add a review for the hotel
  const handleSubmitReview = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/hotels/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewText, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setReviewText('');
        setRating(1);
      })
      .catch((error) => console.error('Error submitting review:', error));
  };

  if (!hotel) {
    return <p>Loading hotel details...</p>;
  }

  return (
    <div className="hotel-details-container">
      <div className="hotel-details">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Description:</strong> {hotel.description}</p>
        <p><strong>Price per Night:</strong> ${hotel.pricePerNight}</p>
        <p><strong>Rooms Available:</strong> {hotel.rooms.length}</p>

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

      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>Rating:</strong> {review.rating} stars</p>
            <p>{review.reviewText}</p>
          </div>
        ))}

        <h4>Add a Review</h4>
        <form onSubmit={handleSubmitReview}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review"
            required
          ></textarea>
          <div>
            <label>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default HotelDetails;
