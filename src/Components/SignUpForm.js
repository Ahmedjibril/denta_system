import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8083/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
                },
                body: JSON.stringify(formData),
            });
            
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An unexpected error occurred');
                throw new Error(errorData.error);
            }
    
            const data = await response.json();
            navigate('/login');
        } catch (error) {
            console.error('SignUp error:', error);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </label>
            <button type="submit">Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default SignUpForm;
