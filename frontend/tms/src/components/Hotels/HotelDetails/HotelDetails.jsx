import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHotel,
  setReviews,
  setLoading,
  setError,
  setReviewText,
  setRating,
  addReview,
  clearReviewForm,
} from '../../../store/hotelDetailsSlice';
import './HotelDetails.css';

const HotelDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { hotel, reviews, loading, error, reviewText, rating } = useSelector(
    (state) => state.hotelDetails
  );

  // Fetch hotel details and reviews
  useEffect(() => {
    fetchHotelDetails();
    fetchReviews();
  }, [id]);

  const fetchHotelDetails = () => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/api/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setHotel(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError('Error fetching hotel details'));
        dispatch(setLoading(false));
      });
  };

  const fetchReviews = () => {
    fetch(`http://localhost:8080/api/hotels/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => dispatch(setReviews(data)))
      .catch((error) => dispatch(setError('Error fetching reviews')));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = { reviewText, rating };
    fetch(`http://localhost:8080/api/hotels/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addReview(data));
        dispatch(clearReviewForm()); 
      })
      .catch((error) => dispatch(setError('Error submitting review')));
  };

  const handleReviewTextChange = (e) => {
    dispatch(setReviewText(e.target.value));
  };

  const handleRatingChange = (e) => {
    dispatch(setRating(e.target.value));
  };

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!hotel) {
    return <p>No hotel found.</p>;
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
            onChange={handleReviewTextChange}
            placeholder="Write your review"
            required
          ></textarea>
          <div>
            <label>Rating:</label>
            <select
              value={rating}
              onChange={handleRatingChange}
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
