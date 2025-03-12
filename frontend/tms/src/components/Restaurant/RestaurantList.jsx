import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');

  const fetchRestaurants = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (cuisine) params.append('cuisine', cuisine);

    fetch(`/api/restaurants/search?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  };

  // Load all restaurants on first render
  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRestaurants();
  };

  return (
    <div className="restaurant-list-container">
      <div className="search-header">
        <h2>Search Restaurants</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="results-container">
        <div className="results-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.restaurantId} className="restaurant-card">
              <div className="restaurant-name">{restaurant.restaurantName}</div>
              <div className="restaurant-cuisine">
                <strong>Cuisine:</strong> {restaurant.cuisine}
              </div>
              <div className="restaurant-location">
                <strong>Location:</strong> {restaurant.restaurantLocation}
              </div>
              <Link
                to={`/restaurants/${restaurant.restaurantId}`}
                className="view-details-link"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
