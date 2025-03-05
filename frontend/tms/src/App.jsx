import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/userSlice';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home';
import FlightHome from './components/Flights/FlightHome';
import Navbar from './components/Navbar';
import LoginForm from './components/Login/LoginForm';
import Onboarding from './components/Registration/Onboarding';
import FlightSearch from './components/Flights/FlightSearch';

const App = () => {
    return (
        <>
        <Navbar/>
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding />} />  {/*Add this route*/}
                <Route path="/home" element={<Home />} />  {/*Add this route*/}
                <Route path="/login" element={<FlightHome />} />  {/* Add this route */}
                <Route path="/flights" element={<FlightHome />} />  {/* Add this route */}
                <Route path="/flightsearch" element={<FlightSearch/>} />  {/* Add this route */}
                <Route path="/register" element={<RegistrationForm />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
        </>
    );
};

export default App;