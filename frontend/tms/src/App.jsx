import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home';  // Your home component or just a placeholder
import FlightHome from './components/Flights/FlightHome';
import Navbar from './components/Navbar';
import LoginForm from './components/Login/LoginForm'
import './App.css'
import Onboarding from './components/Registration/Onboarding';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';

const App = () => {
    return (
        <>
        <Navbar/>
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding />} />  {/*Add this route*/}
                <Route path="/home" element={<Home />} />  {/*Add this route*/}
                <Route path="/login" element={<LoginForm />} />  {/* Add this route */}
                <Route path="/flights" element={<FlightHome />} />  {/* Add this route */}
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
        </>
    );
};

export default App;