import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DeletePatient.css'; // Assuming you have corresponding CSS

const Delete = () => {
    const { state } = useLocation();
    const { patientId} = state || {};
    const navigate = useNavigate();

    const [confirmDelete, setConfirmDelete] = useState(false);

    // Function to handle patient deletion
    const handleDelete = async () => {
        if (!patientId) {
            console.error('Patient ID is missing or invalid');
            alert('Patient ID is missing or invalid. Please go back and select a patient.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/delete-patient', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                alert('Patient deleted successfully.');
                navigate('/patient-list');
            } else {
                alert('Failed to delete patient. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient. Please try again later.');
        }
    };

    return (
        <div>
            <nav className="navi-navbar">
                <ul>
                    <li><Link to="/">Logout</Link></li>
                    <li><Link to="/add-patient">Add Patient</Link></li>
                    <li><Link to="/patient-list">Patient List</Link></li>
                    <li><Link to="/update-balance">Update Balance</Link></li>
                    <li><Link to="/patient-report">Patient Report</Link></li>
                </ul>
            </nav>

            <div className="delete-patient-receipt">
                <h1>Delete Patient</h1>
                <div className="delete-patient-item">
                    <span className="delete-patient-label">Patient ID:</span>
                    <span className="delete-patient-value">{patientId}</span>
                </div>
                <div className="delete-patient-item">
                    <span className="delete-patient-label">Name:</span>
                    <span className="delete-patient-value">{name}</span>
                </div>
                <div className="delete-patient-item">
                    <span className="delete-patient-label">Phone Number:</span>
                    <span className="delete-patient-value">{phoneNumber}</span>
                </div>
                <div className="delete-patient-item">
                    <span className="delete-patient-label">Location:</span>
                    <span className="delete-patient-value">{location}</span>
                </div>

                {/* Confirmation Section */}
                <div className="delete-patient-confirm">
                    <p>Are you sure you want to delete this patient?</p>
                    <button onClick={() => setConfirmDelete(true)}>Yes, Delete</button>
                    <button onClick={() => navigate('/patient-list')}>Cancel</button>
                </div>

                {confirmDelete && (
                    <div className="delete-patient-confirmation">
                        <p>Confirm deletion?</p>
                        <button onClick={handleDelete}>Confirm</button>
                        <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Delete;
