import React, { useState } from 'react';
import './LoginForm.css';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleGoogleLogin = async (response) => {
        const { credential } = response;
        const res = await fetch('http://localhost:8080/api/users/login/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ googleToken: credential }),  // Changed 'token' to 'googleToken' as expected by the backend
        });

        if (res.ok) {
            window.location.href = '/dashboard';  // Redirect to the dashboard after successful login
        } else {
            setError('Google login failed, please try again.');  // Show an error message if Google login fails
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission

        const loginData = { email, password };
        const res = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),  // Send login credentials to the backend
        });

        if (res.ok) {
            window.location.href = '/dashboard';  // Redirect to the dashboard after successful login
        } else {
            setError('Invalid credentials, please try again.');  // Show an error message if login fails
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Bind email input to the state
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Bind password input to the state
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}  // Display error message if there's any

            <div className="google-login">
                <GoogleLogin
                    onSuccess={handleGoogleLogin}  // Handle Google login success
                    onError={(error) => console.log('Login Failed', error)}  // Handle Google login error
                    clientId="298241894325-eaibicjhtaiumbaseu8olovuohje7gia.apps.googleusercontent.com"  // Ensure you set the correct Google OAuth client ID here
                />
            </div>
        </div>
    );
};

export default LoginPage;
