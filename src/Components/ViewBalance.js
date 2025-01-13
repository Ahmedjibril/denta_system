import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ViewBalance.css';

const ViewBalance = () => {
    const { state } = useLocation();
    const { patientId, name, phoneNumber, location } = state || {};
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    const fetchBalance = async () => {
        if (!patientId) {
            console.error('Patient ID is missing or invalid');
            alert('Patient ID is missing or invalid. Please go back and select a patient.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/get-balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
            } else {
                alert('Failed to retrieve balance. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            alert('Failed to fetch balance. Please try again later.');
        }
    };

    useEffect(() => {
        if (patientId) {
            fetchBalance();
        }
    }, [patientId]);

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
            <div className="view-balance-receipt">
                <h1>Patient Balance Receipt</h1>
                <div className="view-balance-item">
                    <span className="view-balance-label">Patient ID:</span>
                    <span className="view-balance-value">{patientId}</span>
                </div>
                <div className="view-balance-item">
                    <span className="view-balance-label">Name:</span>
                    <span className="view-balance-value">{name}</span>
                </div>
                <div className="view-balance-item">
                    <span className="view-balance-label">Phone Number:</span>
                    <span className="view-balance-value">{phoneNumber}</span>
                </div>
                <div className="view-balance-item">
                    <span className="view-balance-label">Location:</span>
                    <span className="view-balance-value">{location}</span>
                </div>
                <div className="view-balance-item">
                    <span className="view-balance-label">Balance:</span>
                    <span className="view-balance-value">{balance !== null ? balance : 'Loading...'}</span>
                </div>
                <button onClick={() => navigate('/patient-list')}>Back to Patient List</button>
            </div>
        </div>
    );
};

export default ViewBalance;
