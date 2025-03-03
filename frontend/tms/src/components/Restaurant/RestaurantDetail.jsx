import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [newReviewRating, setNewReviewRating] = useState("5");
  const [newReviewComment, setNewReviewComment] = useState("");

  // Function to fetch restaurant details (including reviews and average rating)
  const fetchDetails = () => {
    fetch(`/api/restaurants/${id}/details`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details');
        }
        return response.json();
      })
      .then((data) => setDetails(data))
      .catch((error) =>
        console.error('Error fetching restaurant details:', error)
      );
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Handler for submitting a new review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      restaurantId: details.restaurant.restaurantId,
      reviewScore: parseFloat(newReviewRating),
      comment: newReviewComment
    };

    fetch(`/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        return response.json();
      })
      .then((data) => {
        // After successful submission, refresh the details and clear the form
        fetchDetails();
        setNewReviewRating("5");
        setNewReviewComment("");
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  if (!details) {
    return <div className="restaurant-detail-loading">Loading...</div>;
  }

  const { restaurant, reviews, averageRating } = details;

  return (
    <div className="restaurant-detail-container">
      <div className="restaurant-detail-content">
        {/* Left column with restaurant details */}
        <div className="restaurant-detail-left">
          <h2 className="restaurant-detail-title">{restaurant.restaurantName}</h2>
          <p className="restaurant-detail-description">
            {restaurant.restaurantDescription}
          </p>
          <div className="restaurant-detail-info">
            <strong>Location:</strong> {restaurant.restaurantLocation}
          </div>
          <div className="restaurant-detail-info">
            <strong>Cuisine:</strong> {restaurant.cuisine}
          </div>
          <div className="restaurant-detail-rating">
            Average Review: {averageRating !== undefined ? averageRating.toFixed(1) : 'N/A'}
          </div>
        </div>
        {/* Right column with reviews and review submission form */}
        <div className="restaurant-detail-right">
          <h3 className="restaurant-detail-reviews-title">Reviews:</h3>
          {reviews && reviews.length > 0 ? (
            <ul className="restaurant-detail-reviews-list">
              {reviews.slice(0, 3).map((review) => (
                <li key={review.id} className="restaurant-detail-review-item">
                  <p>
                    <strong>Rating:</strong> {review.reviewScore}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="restaurant-detail-no-reviews">No reviews available.</p>
          )}

          {/* Review submission form */}
          <div className="review-form-container">
            <h3 className="review-form-title">Write a Review</h3>
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <label>
                Rating:
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              <label>
                Comment:
                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Write your review here..."
                />
              </label>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
