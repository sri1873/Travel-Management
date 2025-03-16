import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setHotels, setLoading, setError, setLocation } from '../../../store/hotelSlice';
import { useDispatch, useSelector } from 'react-redux';
import './HotelDiscovery.css';

const HotelDiscovery = () => {
  const dispatch = useDispatch();
  const { hotels, loading, error, location } = useSelector((state) => state.hotels);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = (location = '') => {
    const url = location
      ? `http://localhost:8080/api/hotels/search?location=${location}`
      : `http://localhost:8080/api/hotels/getAll`;

    dispatch(setLoading(true));

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setHotels(data)); 
        dispatch(setLoading(false)); 
      })
      .catch((error) => {
        dispatch(setError('Error fetching hotels'));
        dispatch(setLoading(false));
      });
  };

  const handleSearch = () => {
    if (!location) {
      fetchHotels(); 
    } else {
      fetchHotels(location); 
    }
  };

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value)); 
  };

  return (
    <div className="hotel-discovery">
      <h1>Explore Your Next Getaway</h1>
      <p className="slogan">Find Your Perfect Stay, Anywhere!</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={handleLocationChange} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="hotel-list">
        {loading && <p>Loading...</p>} 
        {error && <p>{error}</p>}

        {hotels.length === 0 && !loading && !error ? (
          <p>No hotels found for the selected location.</p>
        ) : (
          hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>${hotel.pricePerNight} per night</p>
              <Link to={`/hotels/${hotel.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelDiscovery;