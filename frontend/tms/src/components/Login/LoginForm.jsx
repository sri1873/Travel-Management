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
            body: JSON.stringify({ token: credential }),
        });

        if (res.ok) {
            window.location.href = '/dashboard';
        } else {
            setError('Google login failed, please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email, password };
        const res = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (res.ok) {
            window.location.href = '/dashboard';
        } else {
            setError('Invalid credentials, please try again.');
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}

            <div className="google-login">
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={(error) => console.log('Login Failed', error)}
                />
            </div>
        </div>
    );
};

export default LoginPage;