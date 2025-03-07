import React from 'react';
import { Link } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = () => {
    return (
        <div className="onboarding-container">
            <div className="logo-container">
                <img
                    src="/tms_logo.png"
                    alt="Travel Management System Logo"
                    className="logo"
                />
            </div>
            <h1>Travel Management System</h1>
            <p>Discover with ease</p>
            <div className="buttons-container">
                <Link to="/register">
                    <button className="onboarding-button">Register</button>
                </Link>
                <Link to="/login">
                    <button className="onboarding-button">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Onboarding;
