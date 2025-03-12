import React, { useState } from "react";
import { useSelector } from "react-redux";
import FlightForm from "./FlightForm";
import "./styles/flightSearch.css";

const FlightSearch = () => {
    const searchDetails = useSelector((state) => state.flight);

    const flightData = [
        { id: 1, airline: "AirX", price: 250, duration: "3h 45m", departure: "10:30 AM", arrival: "2:15 PM", layover: 1, layoverDuration: "1h 30m" },
        { id: 2, airline: "SkyWings", price: 300, duration: "4h 15m", departure: "12:00 PM", arrival: "4:15 PM", layover: 0, layoverDuration: "0" },
        { id: 3, airline: "FlyHigh", price: 280, duration: "3h 50m", departure: "2:30 PM", arrival: "6:20 PM", layover: 1, layoverDuration: "2h 20m" },
    ];

    const [flights, setFlights] = useState(flightData);
    const [filters, setFilters] = useState({
        maxPrice: 500,
        layover: "any",
        airline: "all",
    });

    // Filtering flights based on user selection
    const filteredFlights = flights.filter(flight =>
        flight.price <= filters.maxPrice &&
        (filters.layover === "any" || (filters.layover === "direct" && flight.layover === 0) || (filters.layover === "1+" && flight.layover > 0)) &&
        (filters.airline === "all" || flight.airline === filters.airline)
    );

    const handleSearch = (e) => {
        e?.preventDefault();
        setFlights(flightData);
    };

    return (
        <div className="container mt-4">
            <FlightForm handleNavigate={handleSearch} />
            <div className="main-res-container">
                <div className="filter-sidebar">
                    <h4>Filters</h4>
                    <div className="filter-group">
                        <label>Max Price: ${filters.maxPrice}</label>
                        <input type="range" min="100" max="500" value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                    </div>

                    <div className="filter-group">
                        <label>Layovers</label>
                        <select onChange={(e) => setFilters({ ...filters, layover: e.target.value })}>
                            <option value="any">Any</option>
                            <option value="direct">Direct</option>
                            <option value="1+">1+ Layover</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Airline</label>
                        <select onChange={(e) => setFilters({ ...filters, airline: e.target.value })}>
                            <option value="all">All</option>
                            <option value="AirX">AirX</option>
                            <option value="SkyWings">SkyWings</option>
                            <option value="FlyHigh">FlyHigh</option>
                        </select>
                    </div>
                </div>
                <div className="flight-results">
                    {filteredFlights.length > 0 ? (
                        filteredFlights.map((flight) => (

                            <div className="flight-card card mb-3" key={flight.id}>
                                <div className="flight-info card-body ">
                                    <h5 className="card-title">{flight.airline}</h5>
                                    <div className="time">
                                        <span>{flight.departure} → {flight.arrival}</span>
                                    </div>
                                    <div className="details">
                                        <span>{flight.duration}</span>
                                        {flight.layover > 0 && <span>{flight.layover} Layover ({flight.layoverDuration})</span>}
                                    </div>
                                </div>
                                    <div className="price">
                                        <h4>${flight.price}</h4>
                                    </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-3">No flights found. Adjust filters or search again.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default FlightSearch;
