<<<<<<< HEAD

// LoginForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 9b6675f (Updated project)
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
<<<<<<< HEAD
=======
    
>>>>>>> 9b6675f (Updated project)
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An unexpected error occurred');
                throw new Error(errorData.error);
            }
<<<<<<< HEAD
            const data = await response.json();
            localStorage.setItem('AccessToken', data.token); // Store token
            navigate('/add-patient');
=======
    
            const data = await response.json();
            localStorage.setItem('AccessToken', data.token); // Store token in localStorage
    
            // Check if token is successfully stored
            if (localStorage.getItem('AccessToken')) {
                navigate('/add-patient');
            } else {
                setError('Authorization token is missing. Please try again.');
            }
>>>>>>> 9b6675f (Updated project)
        } catch (error) {
            console.error('Login error:', error);
        }
    };
<<<<<<< HEAD
=======
    
>>>>>>> 9b6675f (Updated project)

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Username:
<<<<<<< HEAD
                <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </label>
            <label>
                Password:
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </label>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
            <p>Don’t have an account? <Link to="/signup">Sign Up here</Link></p>
=======
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
>>>>>>> 9b6675f (Updated project)
        </form>
    );
};

<<<<<<< HEAD
export default LoginForm;
=======
export default LoginForm;
>>>>>>> 9b6675f (Updated project)
