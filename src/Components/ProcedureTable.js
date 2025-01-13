import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { Link, useNavigate } from 'react-router-dom';

>>>>>>> 9b6675f (Updated project)
import './ProcedureTable.css'; // Assuming you have CSS for styling

const ProcedureTable = () => {
    const [procedures, setProcedures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
<<<<<<< HEAD
=======
    const navigate = useNavigate();

>>>>>>> 9b6675f (Updated project)

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8083/get/patient_procedures', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
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

    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show message if no procedures are available
    if (procedures.length === 0) {
        return <div>No procedures available.</div>;
    }

    // Group procedures by patient ID
    const groupedByPatient = procedures.reduce((acc, procedure) => {
        const patientId = procedure.patientId;
        if (!acc[patientId]) {
            acc[patientId] = [];
        }
        acc[patientId].push(procedure);
        return acc;
    }, {});

    const calculateBalance = (patientProcedures) => {
        return patientProcedures.reduce((acc, procedure) => acc + procedure.balance, 0);
    };

    return (
<<<<<<< HEAD
        <div>
=======
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

>>>>>>> 9b6675f (Updated project)
            <h2>Patient Procedures</h2>
            {Object.entries(groupedByPatient).map(([patientId, patientProcedures]) => (
                <div key={patientId} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3>Patient ID: {patientId}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Procedure Name</th>
                                <th>Total Amount</th>
                                <th>Amount Paid</th>
                                <th>Dentist Name</th>
                                <th>Notes</th>
<<<<<<< HEAD
=======
                                <th>Balance</th>
>>>>>>> 9b6675f (Updated project)
                            </tr>
                        </thead>
                        <tbody>
                            {patientProcedures.map((procedure) => (
                                <tr key={procedure.id}>
                                    <td>{procedure.procedureName}</td>
                                    <td>{procedure.totalAmount}</td>
                                    <td>{procedure.amountPaid}</td>
                                    <td>{procedure.dentistName}</td>
                                    <td>{procedure.notes}</td>
<<<<<<< HEAD
=======
                                    <td>{procedure.balance}</td>

>>>>>>> 9b6675f (Updated project)
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Balance:</td>
                                <td colSpan="2" style={{ fontWeight: "bold" }}>{calculateBalance(patientProcedures)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ProcedureTable;
