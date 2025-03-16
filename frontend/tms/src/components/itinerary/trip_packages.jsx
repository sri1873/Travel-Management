import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./trip_packages.css";
import { setBookingHistory } from "../../store/itineraryBookingSlice";

const TripPackages = () => {
    const dispatch = useDispatch();
    const [tripPackages, setTripPackages] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [date, setDate] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8081/api/trip-packages")
            .then((response) => setTripPackages(response.data))
            .catch((error) => console.error("Error fetching trip packages:", error));
    }, []);


    const openPopup = (pkg) => {
        setSelectedPackage(pkg);
        setShowPopup(true);
    };

    const handleConfirm = () => {
        if (date) {
            const newBooking = { ...selectedPackage, date: new Date(date).toISOString() };
            axios.post("http://localhost:8081/api/bookings",newBooking);
            dispatch(setBookingHistory(newBooking));
            alert(`Ticket booked for ${selectedPackage.name} on ${date}`);
            setShowPopup(false);
        } else {
            alert("Please select a date");
        }
    };

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Your Itinerary</h1>
            </div>

            <div className="itinerary_packages_container">
                <div className="search_bar">
                    <input type="text" placeholder="Search" />
                    <button className="search_btn">Search</button>
                    <button className="filter_btn">Filters</button>
                </div>

                <div className="packages_grid">
                    {tripPackages.map((pkg) => (
                        <div className="package_card" key={pkg.id}>
                            <img src={`src/assets/itinerary_assets/${pkg.image}`} alt={pkg.name} />
                            <h2>{pkg.name}</h2>
                            <div className="desc_book">
                                <p>{pkg.description}</p>
                                <div>
                                    <p>Price: {pkg.price}</p>
                                    <button className="book_btn" onClick={() => openPopup(pkg)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showPopup && selectedPackage && (
                <div className="popup_overlay">
                    <div className="popup_content">
                        <img src={`src/assets/itinerary_assets/${selectedPackage.image}`} alt={selectedPackage.name} />
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
            )}
        </div>
    );
};

export default TripPackages;
