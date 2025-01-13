import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
 import './CreateUserForm.css';

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        if (!token) {
            navigate('/'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password || !email) {
            alert('All fields are required');
            return;
        }

        const user = { username, password, email, role };

        try {
            const response = await fetch('http://localhost:8083/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`, // Admin's token
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            alert('User created successfully');
            setUsername('');
            setPassword('');
            setEmail('');
            setRole('user');

            navigate('/'); // Redirect to user list or dashboard
        } catch (error) {
            console.error('Error creating user:', error.message);
            alert('Failed to create user: ' + error.message);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Logout</Link></li>
                    <li><Link to="/add-patient">Add Patient</Link></li>
                    <li><Link to="/patient-list">Patient List</Link></li>
                    <li><Link to="/update-balance">Update Balance</Link></li>
                    <li><Link to="/patient-report">Patient Report</Link></li>
                    <li><Link to="/create-user">Create User</Link></li>
                </ul>
            </nav>

            <div className="create-user-form-container">
                <form className="create-user-form" onSubmit={handleSubmit}>
                    <h5>Create User</h5>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;
