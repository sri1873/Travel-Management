import React, { useState } from 'react';
import './RegistrationForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/userSlice';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    const validateForm = () => {
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters and contain uppercase, lowercase, number, special char');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setError('First name and last name must only contain letters/spaces');
            return false;
        }
        return true;
    };

    // Handle Google Login
    const handleGoogleLogin = async (googleResponse) => {
        console.log('Google ID token:', googleResponse.credential);

        setEmail('');        
        setIsGoogleLogin(true);
        try {
            const res = await fetch('http://localhost:8080/api/users/login/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ googleToken: googleResponse.credential }),
            });

            if (res.ok) {
                const data = await res.json();
                dispatch(setCredentials({ token: data.token, role: data.role }));
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRole', data.role);
                localStorage.setItem('authToken', data.token);
                console.log('Google login success, token =', data.token);
                navigate('/dashboard');
            } else {
                const errorData = await res.json();
                console.log('Google login failed:', errorData);
                setError(errorData.message || 'Google login failed');
            }
        } catch (err) {
            console.error('Error calling backend:', err);
            setError('An error occurred while logging in with Google');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!validateForm()) return;

        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setSuccessMessage('User registered successfully! Check your email for verification.');
            } else {
                const errorData = await response.json();
                setError(errorData || 'Registration failed, please try again.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('Registration request failed.');
        }
    };

    return (
        <div className="registration-container">
            <h2>Register</h2>

            {!isGoogleLogin && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            )}

            {successMessage && (
                <div className="success-message">
                    <p>{successMessage}</p>
                    <p>
                        Verified? <Link to="/login">Login here</Link>
                    </p>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}

            {!isGoogleLogin && (
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={(error) => console.log('Google Login Failed', error)}
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    />
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
