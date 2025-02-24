import React, { useState } from 'react';
import './RegistrationForm.css';
import { GoogleLogin } from '@react-oauth/google';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Regex Patterns
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    const validateForm = () => {
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain uppercase, lowercase, a number, and a special character');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setError('First name and last name must only contain letters and spaces');
            return false;
        }
        return true;
    };

    const handleGoogleLogin = (response) => {
        console.log(response);
        setEmail(response?.credential);
        setIsGoogleLogin(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!validateForm()) return;
    
        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };
    
        console.log("Sending user data to backend:", userData);  
    
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        console.log("Response Status: ", response.status);  
        if (response.ok) {
            setSuccessMessage('User registered successfully! Please check your email for verification.');
        } else {
            const errorData = await response.json();
            console.log('Error Data:', errorData);  
            setError(errorData.message || 'Registration failed, please try again.');
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
