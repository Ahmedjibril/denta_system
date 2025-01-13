import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UpdateBalanceForm.css';

const UpdateBalanceForm = () => {
    const [identifier, setIdentifier] = useState('');  // Patient's phone number
    const [amountPaid, setAmountPaid] = useState('');  // Amount being paid
    const [message, setMessage] = useState('');  // For displaying messages
    const navigate = useNavigate();

    const handleUpdateBalance = async (event) => {
        event.preventDefault();
        const updatedBalance = { amountPaid: amountPaid };

        try {
            // Make the PUT request to update balance
            const response = await fetch(`http://localhost:8083/update-balance?phone_number=${identifier}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBalance),
            });

            const data = await response.json();
            console.log(data); // For debugging: check response from the server

            if (response.ok) {
                // Check for specific conditions like zero balance or overpayments
                if (data.balance === 0) {
<<<<<<< HEAD
                    alert("Balance is already zero, no update needed.");
=======
                    alert("Payment exceeds the outstanding balance. Payment not processed.");
>>>>>>> 9b6675f (Updated project)
                } else if (data.overpayment) {
                    alert("Overpayment detected. You cannot pay more than the remaining balance.");
                } else {
                    // On successful update with no issues
                    alert("Balance Updated Successfully");

                    // Navigate to procedure table after showing the alert
                    setTimeout(() => {
                        navigate('/procedure-table');
                    }, 1000);  // 1 second delay to allow the alert to show before navigating
                }
            } else {
                // Handle different error scenarios
                if (data.error === "Phone number not found") {
                    alert("Error: The phone number is incorrect or does not exist.");
                } else {
                    setMessage("Error: " + data.error);  // Set generic error message from server
                    alert("Error: " + data.error);  // Show alert with error message
                }
            }
        } catch (error) {
            console.error('Error updating balance:', error);
            setMessage("There was an error processing your request.");
            alert("There was an error processing your request.");
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
                </ul>
            </nav>

            <div className="update-balance-form-container">
                <form className="update-balance-form" onSubmit={handleUpdateBalance}>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    /><br />
                    <label>Amount Paid:</label>
                    <input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        step="0.01"
                        required
                    /><br />
                    <button type="submit">Update Balance</button>
                </form>
                {message && <p style={{ color: 'red' }}>{message}</p>}
            </div>
        </div>
    );
};

export default UpdateBalanceForm;
