import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/userSlice';
import RegistrationForm from './components/UserManagement/RegistrationForm';
import FlightHome from './components/Flights/FlightHome';
import Navbar from './components/Navigation/Navbar';
import LoginForm from './components/UserManagement/LoginForm';
import Onboarding from './components/OnBoarding/Onboarding';
import VerifyEmail from './components/UserManagement/VerifyEmail';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePasswordForm from './components/UserManagement/ChangePasswordForm';
import TravelAdminDashboard from './components/Dashboard/TravelAdminDashboard';
import './App.css';

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/flights" element={<FlightHome />} />
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