import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientList.css';
const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(`http://localhost:8083/patients/`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                alert('Failed to fetch patients');
            }
        };
        fetchPatients();
    }, []);
    const handleAddProcedure = (patientId) => {
        navigate('/add-procedure', { state: { patientId } });
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
            <div class="page-background">
            <div className="patient-list-container">
                <h1>Patients List</h1>
                <table className="patient-list">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Add Procedure</th>
                            <th>ViewBalance</th>

                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name || 'N/A'}</td>
                                <td>{patient.phoneNumber || 'N/A'}</td>
                                <td>{patient.location || 'N/A'}</td>
                                <td>
                                 <button onClick={() => handleAddProcedure(patient.id)}>
                                        Add Procedure
                                    </button>
                                </td>
                                <td>
                                <button onClick={() => handleViewBalance(patient.id)}>
                                      ViewBalance
                                         </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
        </div>
    );
};

export default PatientList;