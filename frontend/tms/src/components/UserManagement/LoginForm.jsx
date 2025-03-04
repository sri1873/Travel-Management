import React, { useState } from 'react';
import './LoginForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/userSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                dispatch(setCredentials({ token: data.token, role: data.role }));
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRole', data.role);
                if (data.role === 'Admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Google login failed, please try again.');
            }
        } catch (err) {
            console.error('Error during Google login:', err);
            setError('An error occurred with Google login.');
        }
    };

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
                dispatch(setCredentials({ token: data.token, role: data.role }));
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRole', data.role);
                if (data.role === 'Admin') {
                    navigate('/admin/dashboard');
                } else if (data.role === 'TravelAdmin') {
                    navigate('/travel-admin');
                } else {
                    navigate('/dashboard');
             }
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
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                />
            </div>
        </div>
    );
};

export default LoginPage;
