import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./trip_packages.css";
import { setBookingHistory } from "../../store/itineraryBookingSlice";

const TripPackages = () => {
    const dispatch = useDispatch();
    const [tripPackages, setTripPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [date, setDate] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8081/api/trip-packages")
            .then((response) => {
                setTripPackages(response.data);
                setFilteredPackages(response.data); // Initialize filtered packages
            })
            .catch((error) => console.error("Error fetching trip packages:", error));
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredPackages(tripPackages);
        } else {
            const filtered = tripPackages.filter(pkg =>
                pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPackages(filtered);
        }
    };

    const openPopup = (pkg) => {
        setSelectedPackage(pkg);
        setShowPopup(true);
    };

    const handleConfirm = () => {
        if (date) {
            const newBooking = { ...selectedPackage, date: new Date(date).toISOString() };
            axios.post("http://localhost:8081/api/bookings", newBooking)
                .then(() => {
                    dispatch(setBookingHistory(newBooking));
                    alert(`Ticket booked for ${selectedPackage.name} on ${date}`);
                    setShowPopup(false);
                })
                .catch((error) => console.error("Booking error:", error));
        } else {
            alert("Please select a date");
        }
    };

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Manage your Itinerary</h1>
                <div className="itinerary_navbar">
                    <Link to="/itinerary"><p>Trip Packages</p></Link>
                    <Link to="/bookinghistory"><p>Booking History</p></Link>
                </div>
            </div>

            <div className="itinerary_packages_container">
                <div className="search_bar">
                    <input
                        type="text"
                        placeholder="Search by trip package name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search_btn" onClick={handleSearch}>Search</button>
                    <button className="filter_btn">Filters</button>
                </div>

                <div className="packages_grid">
                    {filteredPackages.length === 0 ? (
                        <p>No packages found.</p>
                    ) : (
                        filteredPackages.map((pkg) => (
                            <div className="package_card" key={pkg.id}>
                                <img src={`src/assets/itinerary_assets/${pkg.image}`} alt={pkg.name} />
                                <h2>{pkg.name}</h2>
                                <div className="desc_book">
                                    <p>Price: {pkg.price}</p>
                                    <button className="book_btn" onClick={() => openPopup(pkg)}>Book Now</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showPopup && selectedPackage && (
                <div className="popup_overlay">
                    <div className="popup_content">
                        <img src={`src/assets/itinerary_assets/${selectedPackage.image}`} alt={selectedPackage.name} />
                        <div className="popup_flex">
                            <h2>{selectedPackage.name}</h2>
                            <p>{selectedPackage.description}</p>
                            <p><strong>Essentials:</strong> {selectedPackage.essentials}</p>

                            <label>
                                Date
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </label>
                        
                        <button className="confirm_btn" onClick={handleConfirm}>Confirm Booking</button>
                        <button className="close_btn" onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPackages;
