import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddPatientForm.css';
const AddPatientForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        if (!token) {
            navigate('/add-patient');
        }
    }, [navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !phoneNumber || !location) {
            alert('All fields are required');
            return;
        }
        const patient = {
            name,
            phoneNumber,
            location,
        };

        try {
            const response = await fetch('http://localhost:8083/addPatients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
                },
                body: JSON.stringify(patient),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            alert('Patient added successfully');
            setName('');
            setPhoneNumber('');
            setLocation('');

            navigate('/patient-list');
        } catch (error) {
            console.error('Error adding patient:', error.message);
            alert('Failed to add patient: ' + error.message);
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

            <div className="add-patient-form-container">
                <form className="add-patient-form" onSubmit={handleSubmit}>
                    <h5>Add Patient</h5>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    
                <button type="submit">Add Patient</button>

                </form>
            </div>
        </div>
    );
};

export default AddPatientForm;