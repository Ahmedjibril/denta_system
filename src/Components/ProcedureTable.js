import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProcedureTable.css'; // Assuming you have CSS for styling

const ProcedureTable = () => {
    const [procedures, setProcedures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8083/get/all-procedures', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Full API Response:', JSON.stringify(data, null, 2));
                data.forEach(proc => console.log(`Patient: ${proc.patientName}, ID: ${proc.patientId}`));
                setProcedures(data);
            } catch (error) {
                console.error('Error fetching procedures:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProcedures();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (procedures.length === 0) return <div>No procedures available.</div>;

    // Group procedures by patientId
    const groupedByPatient = procedures.reduce((acc, procedure) => {
        const patientId = procedure.patientId || 'Unknown';
        const patientName = procedure.patientName && procedure.patientName.trim() !== '' ? procedure.patientName : `Unknown Name (ID: ${patientId})`;

        if (!acc[patientId]) {
            acc[patientId] = {
                patientName: patientName,
                procedures: [],
            };
        }
        acc[patientId].procedures.push(procedure);
        return acc;
    }, {});

    const calculateBalance = (patientProcedures) => {
        return patientProcedures.reduce((acc, procedure) => {
            const balance = parseFloat(procedure.balance);
            return isNaN(balance) ? acc : acc + balance;
        }, 0);
    };

    // Calculate overall total amounts
    const totalStats = procedures.reduce(
        (totals, procedure) => {
            const totalAmount = parseFloat(procedure.totalAmount) || 0;
            const amountPaid = parseFloat(procedure.amountPaid) || 0;
            const balance = parseFloat(procedure.balance) || 0;

            totals.totalAmount += totalAmount;
            totals.amountPaid += amountPaid;
            totals.totalBalance += balance;

            return totals;
        },
        { totalAmount: 0, amountPaid: 0, totalBalance: 0 }
    );

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Logout</Link></li>
                    <li><Link to="/add-patient">Add Patient</Link></li>
                    <li><Link to="/patient-list">Patient List</Link></li>
                    <li><Link to="/update-balance">Update Balance</Link></li>
                    <li><Link to="/procedure-table">Procedure Table</Link></li>
                </ul>
            </nav>

            {/* Patient Procedures */}
            {Object.entries(groupedByPatient).map(([patientId, patientData]) => (
                <div key={patientId} className="patient-container">
                    <h3>Patient Name: {patientData.patientName}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Procedure Name</th>
                                <th>Total Amount</th>
                                <th>Amount Paid</th>
                                <th>Balance</th>
                                <th>Dentist Name</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData.procedures.map((procedure) => (
                                <tr key={procedure.id}>
                                    <td>{procedure.procedureName}</td>
                                    <td>{procedure.totalAmount}</td>
                                    <td>{procedure.amountPaid}</td>
                                    <td>{procedure.balance}</td>
                                    <td>{procedure.dentistName}</td>
                                    <td>{procedure.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Total Balance per Patient */}
                    <div className="total-balance">
                        <strong>Total Balance: </strong>
                        <span className="balance-amount">{calculateBalance(patientData.procedures)}</span>
                    </div>
                </div>
            ))}

            {/* Overall Summary */}
            <div className="summary-container">
                {/* <h2>Overall Summary</h2> */}
                <div className="summary-item">
                    <strong>Total Procedures Cost:</strong> <span>{totalStats.totalAmount}</span>
                </div>
                <div className="summary-item">
                    <strong>Total Amount Paid:</strong> <span>{totalStats.amountPaid}</span>
                </div>
                <div className="summary-item">
                    <strong>Total Balance:</strong> <span className="balance-amount">{totalStats.totalBalance}</span>
                </div>
            </div>
        </div>
    );
};

export default ProcedureTable;
