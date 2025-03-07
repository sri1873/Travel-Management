import React, { useState } from "react";

const FlightSearch = () => {
    const [flights, setFlights] = useState([]);
    const [search, setSearch] = useState({
        from: "",
        to: "",
        date: "",
        passengers: 1,
    });

    const flightData = [
        { id: 1, airline: "AirX", price: "$250", duration: "3h 45m", time: "10:30 AM" },
        { id: 2, airline: "SkyWings", price: "$300", duration: "4h 15m", time: "12:00 PM" },
        { id: 3, airline: "FlyHigh", price: "$280", duration: "3h 50m", time: "2:30 PM" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setFlights(flightData);
    };

    return (
        <div className="container mt-5">
            {/* Search Form */}
            <form className="row g-3" onSubmit={handleSearch}>
                <div className="col-md-3">
                    <label className="form-label">From</label>
                    <input type="text" className="form-control" placeholder="City or Airport"
                        onChange={(e) => setSearch({ ...search, from: e.target.value })}
                        required />
                </div>
                <div className="col-md-3">
                    <label className="form-label">To</label>
                    <input type="text" className="form-control" placeholder="City or Airport"
                        onChange={(e) => setSearch({ ...search, to: e.target.value })}
                        required />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control"
                        onChange={(e) => setSearch({ ...search, date: e.target.value })}
                        required />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Passengers</label>
                    <input type="number" className="form-control" min="1" max="10"
                        onChange={(e) => setSearch({ ...search, passengers: e.target.value })}
                        required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary w-100">Search</button>
                </div>
            </form>

            {/* Flight Results */}
            <div className="mt-4">
                {flights.length > 0 ? (
                    flights.map((flight) => (
                        <div className="card mb-3" key={flight.id}>
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{flight.airline}</h5>
                                    <p className="card-text">Time: {flight.time}</p>
                                    <p className="card-text">Duration: {flight.duration}</p>
                                </div>
                                <h4 className="text-primary">{flight.price}</h4>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-3">No flights found. Search to see results.</p>
                )}
            </div>
        </div>
    );
};

export default FlightSearch;
