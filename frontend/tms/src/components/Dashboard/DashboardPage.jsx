import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login'; 
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome to the Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <p>Welcome to your dashboard! You are logged in successfully.</p>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
