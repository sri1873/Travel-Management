import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
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
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
