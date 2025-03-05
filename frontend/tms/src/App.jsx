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
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePasswordForm from './components/Password/ChangePasswordForm';
import TravelAdminDashboard from './components/Dashboard/TravelAdminDashboard';
import './App.css';
import FlightSearch from './components/Flights/FlightSearch';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');
        if (token) {
            dispatch(setCredentials({ token, role }));
        }
    }, [dispatch]);

    return (
        <Router basename="/Travel-Management">
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoute />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/flights" element={<FlightHome />} />
                <Route path="/flights-search" element={<FlightSearch/>} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/change-password" element={<ChangePasswordForm />} />
                <Route path="/travel-admin" element={<TravelAdminDashboard />} />

            </Routes>
        </Router>
    );
};

export default App;