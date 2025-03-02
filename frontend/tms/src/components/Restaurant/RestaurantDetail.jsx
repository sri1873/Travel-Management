import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
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
  }, [id]);

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
        {/* Right column with reviews */}
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
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
