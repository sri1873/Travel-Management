import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DashboardPage from './components/Dashboard/DashboardPage';
import TravelAdminDashboard from './components/Dashboard/TravelAdminDashboard';
import FlightBooking from './components/Flights/FlightBooking';
import FlightDetails from './components/Flights/FlightDetails';
import FlightHome from './components/Flights/FlightHome';
import FlightSearch from './components/Flights/FlightSearch';
import HotelBooking from './components/Hotels/HotelBooking/HotelBooking';
import HotelDetails from './components/Hotels/HotelDetails/HotelDetails';
import HotelDiscovery from './components/Hotels/HotelDiscovery/HotelDiscovery';
import Navbar from './components/Navigation/Navbar';
import Onboarding from './components/OnBoarding/Onboarding';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';
import RestaurantList from './components/Restaurant/RestaurantList';
import ChangePasswordForm from './components/UserManagement/ChangePasswordForm';
import LoginForm from './components/UserManagement/LoginForm';
import RegistrationForm from './components/UserManagement/RegistrationForm';
import VerifyEmail from './components/UserManagement/VerifyEmail';

const App = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     const role = localStorage.getItem('userRole');
    //     if (token) {
    //         dispatch(setCredentials({ token, role }));
    //     }
    // }, [dispatch]);
    return (
        <Router >
            <Navbar />
            <Routes>
                {/* <Route path="/" element={<ProtectedRoute />} /> */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/flights" element={<FlightHome />} />
                <Route path="/flights-search" element={<FlightSearch />} />
                <Route path="/flights-booking" element={<FlightBooking />} />
                <Route path="/flights-details" element={<FlightDetails />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/change-password" element={<ChangePasswordForm />} />
                <Route path="/travel-admin" element={<TravelAdminDashboard />} />
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                <Route path="/hotels" element={<HotelDiscovery />} />
                <Route path="/hotels/:id" element={<HotelDetails />} />
                <Route path="/booking/:hotelId/:roomId" element={<HotelBooking />} />
            </Routes>
        </Router>
    );
};

export default App;