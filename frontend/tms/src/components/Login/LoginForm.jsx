import React, { useState } from 'react';
import './LoginForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleGoogleLogin = async (response) => {
        const { credential } = response;
        try {
            const res = await fetch('http://localhost:8080/api/users/login/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ googleToken: credential }),
            });
    
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('authToken', data.token);
                navigate('/dashboard');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Google login failed, please try again.');
            }
        } catch (err) {
            console.error('Error during Google login:', err);
            setError('An error occurred with Google login.');
        }
    };

    // Email/password login handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const loginData = { email, password };
        try {
            const res = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
    
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('authToken', data.token);
                navigate('/dashboard');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Invalid credentials, please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred during login.');
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
                    onError={(err) => console.log('Google Login Failed', err)}
                    clientId="298241894325-eaibicjhtaiumbaseu8olovuohje7gia.apps.googleusercontent.com"
                />
            </div>
        </div>
    );
};

export default LoginPage;
