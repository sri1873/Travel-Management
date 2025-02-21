import React, { useState } from 'react';
import './RegistrationForm.css';
import { GoogleLogin } from '@react-oauth/google';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);  

    const handleGoogleLogin = (response) => {
        console.log(response);
        setEmail(response?.credential);
        setIsGoogleLogin(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = isGoogleLogin
            ? { email, firstName, lastName }
            : { firstName, lastName, email, password };

        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            setSuccessMessage('User registered successfully! Please check your email for verification.');
        } else {
            setError('Registration failed, please try again.');
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
                    <button type="submit">Register</button>
                </form>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}  
            {error && <p className="error-message">{error}</p>}

            {!isGoogleLogin && (
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={(error) => console.log('Login Failed', error)}
                    />
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
