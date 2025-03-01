import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home';  // Your home component or just a placeholder
import FlightHome from './components/Flights/FlightHome';
import Navbar from './components/Navbar';
import './App.css'
import Onboarding from './components/Registration/Onboarding';

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
                <Route path="/register" element={<RegistrationForm />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
        </>
    );
};

export default App;
