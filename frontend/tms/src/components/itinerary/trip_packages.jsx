import React from "react";
import {Link} from "react-router-dom";
import dingle1 from "../../assets/itinerary_assets/dingle1.png";
import kerry from '../../assets/itinerary_assets/kerry.png';
import './trip_packages.css';

const Itinerary=()=>{
    return (
    <div className="landing">
        <div className="itinerary_title">
            <h1>Your Itinerary</h1>
        </div>

        <div className="itinerary_navbar">
                <p><Link to="/itinerary">Trip Packages</Link></p>
                <p><Link to="/itinerary">Plan Activities</Link></p>
                <p><Link to="/itinerary">Booking History</Link></p>
        </div>
        {/* // Trip Pckages page (default)  */}
        <div className="itinerary_packages_container">
            <div className="search_bar">
                <input type="text" placeholder="Search"/>
                <button className="search_btn">Search</button>
                <button className="filter_btn">Filters</button>
            </div>

            <div className="packages_grid">
                <div className="package_card">
                    <img src={dingle1} alt="dingle1"></img>
                    <h2>Dingle Peninsula Tour</h2>
                    <div className="desc_book">
                        <p>Visit the beautiful dingle peninsula</p>
                        <div>
                            <p>Price:100eur</p>
                            <button className="book_btn">Book Now</button>
                        </div>
                    </div>
                </div>

                <div className="package_card">
                    <img src={kerry} alt="kerry"></img>
                    <h2>Ring of Kerry Tour</h2>
                    <div className="desc_book">
                        <p>The fierce ring of Kerry awaits you!</p>
                        <div>
                            <p>Price:90eur</p>
                            <button className="book_btn">Book Now</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
    );
};
export default Itinerary;