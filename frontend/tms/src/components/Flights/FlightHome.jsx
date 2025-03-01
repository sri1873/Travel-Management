import React, { useState } from 'react';
import './styles/flightHome.css'

const FlightHome = () => {

    return (<>
        <div className="flight-home-container">
            <div className='flight-info-container'>
                <div className="flight-hero-content">
                    <h1>Welcome to <span className="highlight-text">Flight Surfer</span> by TMS</h1>
                    <p>Your gateway to seamless and affordable travel.</p>
                </div>
                <div className="flight-search">
                    <div className="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">To</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Depart</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Return</label>
                    </div>
                    <button className="search-btn">Search</button>
                </div>
            </div>
            <div className="flight-pics">
                <div className="pic-1"></div>
                <div className="pic-2"></div>
                <div className="pic-3"></div>
            </div>

        </div>
    </>)
}
export default FlightHome;