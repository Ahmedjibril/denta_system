import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8083/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An unexpected error occurred');
                throw new Error(errorData.error);
            }
    
            const data = await response.json();
            localStorage.setItem('AccessToken', data.token); // Store token in localStorage
    
            // Check if token is successfully stored
            if (localStorage.getItem('AccessToken')) {
                navigate('/add-patient');
            } else {
                setError('Authorization token is missing. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;
