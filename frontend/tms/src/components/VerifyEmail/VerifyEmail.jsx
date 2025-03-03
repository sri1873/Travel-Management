import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            const verifyEmail = async () => {
                const response = await fetch(`http://localhost:8080/api/users/verify-email?token=${token}`);
                if (response.ok) {
                    alert('Email verified successfully!');
                    navigate('/login');  // Redirect to login page after successful verification
                } else {
                    alert('Verification failed!');
                }
            };
            verifyEmail();
        }
    }, [navigate]);

    return <div>Verifying your email...</div>;
};

export default VerifyEmail;
