import React, { useState } from "react";
import { Link } from "react-router-dom";
import dingle1 from "../../assets/itinerary_assets/dingle1.png";
import kerry from "../../assets/itinerary_assets/kerry.png";
import './trip_packages.css';

const Itinerary = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [date, setDate] = useState("");

    const packages = [
        {
            id: 1,
            title: "Dingle Peninsula Tour",
            image: dingle1,
            description: "Visit the beautiful Dingle Peninsula",
            price: "100 EUR",
            essentials: "Comfortable shoes, Camera",
            reviews: ["Breathtaking views!", "A must-see adventure!"]
        },
        {
            id: 2,
            title: "Ring of Kerry Tour",
            image: kerry,
            description: "The fierce ring of Kerry awaits you!",
            price: "90 EUR",
            essentials: "Raincoat, Snacks",
            reviews: ["Spectacular scenery!", "Amazing cultural experience!"]
        }
    ];

    const openPopup = (pkg) => {
        setSelectedPackage(pkg);
        setShowPopup(true);
    };

    const handleConfirm = () => {
        if (date) {
            const newBooking = { ...selectedPackage, date };
            setBookingDetails([...bookingDetails, newBooking]);
            localStorage.setItem("bookings", JSON.stringify([...bookingDetails, newBooking]));
            alert(`Ticket booked for ${selectedPackage.title} on ${date}`);
            setShowPopup(false);
        } else {
            alert("Please select a date and time.");
        }
    };

    return (
        <div className="landing">
            <div className="itinerary_title">
                <h1>Your Itinerary</h1>
            </div>

            <div className="itinerary_navbar">
                <p><Link to="/itinerary">Trip Packages</Link></p>
                <p><Link to="/itinerary">Plan Activities</Link></p>
                <p><Link to="/bookinghistory">Booking History</Link></p>
            </div>

            <div className="itinerary_packages_container">
                <div className="search_bar">
                    <input type="text" placeholder="Search"/>
                    <button className="search_btn">Search</button>
                    <button className="filter_btn">Filters</button>
                </div>
                
                <div className="packages_grid">
                    {packages.map((pkg) => (
                        <div className="package_card" key={pkg.id}>
                            <img src={pkg.image} alt={pkg.title} />
                            <h2>{pkg.title}</h2>
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
                        <img src={selectedPackage.image} alt={selectedPackage.title} />
                        <h2>{selectedPackage.title}</h2>
                        <p>{selectedPackage.description}</p>
                        <p><strong>Essentials:</strong> {selectedPackage.essentials}</p>

                        <label>Date & Time: 
                            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                        </label>

                        <h3>Reviews:</h3>
                        <ul>
                            {selectedPackage.reviews.map((review, index) => (
                                <li key={index}>{review}</li>
                            ))}
                        </ul>

                        <button className="confirm_btn" onClick={handleConfirm}>Confirm Booking</button>
                        <button className="close_btn" onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Itinerary;
