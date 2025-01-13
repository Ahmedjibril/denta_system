import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
const SignUpForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
<<<<<<< HEAD
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8083/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
=======
    const [token, setToken] = useState(localStorage.getItem("token")); // Get token from local storage
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Only allow admins to access this form
            if (!token) {
                setError("You need to be logged in as admin to create users.");
                return;
            }

            const response = await fetch('http://localhost:8083/signup', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token // Send the token for verification
                },
                body: JSON.stringify(formData),
            });

>>>>>>> 9b6675f (Updated project)
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An unexpected error occurred');
                throw new Error(errorData.error);
            }
<<<<<<< HEAD
=======

>>>>>>> 9b6675f (Updated project)
            const data = await response.json();
            alert('Sign-up successful: ' + data.message);
            navigate('/add-patient');
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button type="submit" className="signup-btn">Sign Up</button>
                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
};

<<<<<<< HEAD
export default SignUpForm;
=======

export default SignUpForm;
>>>>>>> 9b6675f (Updated project)
