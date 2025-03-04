import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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

    const handleEdit = (patientId) => {
        navigate('/edit-procedure', { state: { patientId } });
    };

    const handleDelete = async (patientId) => {
        const username = localStorage.getItem("username");

        try {
            const response = await fetch(`http://localhost:8083/delete-patient/${patientId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "username": username 
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete patient");
            }
            alert("Patient deleted successfully!"); 

            setPatients(patients.filter(patient => patient.id !== patientId));
    
        } catch (error) {
            console.error("Error deleting patient:", error);
            alert("Ask admin to delete!"); 
        }
    };

    const handleViewBalance = (patientId) => {
        navigate('/view-balance', { state: { patientId } });
    };

    // Filter patients based on search term
    const filteredPatients = patients.filter(patient =>
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            <div className="page-background">
                <div className="patient-list-container">
                    <h1>Patients List</h1>
                    
                    <input
                        type="text"
                        placeholder="Search by name, phone, or location..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <table className="patient-list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Location</th>
                                <th>Add Procedure</th>
                                <th>View Balance</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
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
                                            View Balance
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(patient.id)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(patient.id)}>
                                            Delete
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
