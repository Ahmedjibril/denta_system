import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Add a class to the body for login page background
        document.body.classList.add('login-background');
        
        // Remove the class when the component unmounts
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

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
            
            localStorage.setItem('AccessToken', data.token);
            localStorage.setItem('username', formData.username);  
    
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
        <div className="login-page">
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
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default LoginForm;
