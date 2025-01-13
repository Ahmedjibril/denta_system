import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientList.css';
<<<<<<< HEAD
const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
=======

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

>>>>>>> 9b6675f (Updated project)
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
<<<<<<< HEAD
    const handleAddProcedure = (patientId) => {
        navigate('/add-procedure', { state: { patientId } });
    };
=======

    const handleAddProcedure = (patientId) => {
        navigate('/add-procedure', { state: { patientId } });
    };

    const handleEdit = (patientId) => {
        navigate('/edit-procedure', { state: { patientId } }); // Adjust this route to match your setup
    };

    const handleDelete = async (patientId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8083/patients/${patientId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            alert('Patient deleted successfully');
            setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient');
        }
    };

    // const handleViewPatientDetails = (patientId) => {
    //     navigate('/patient-details', { state: { patientId } });
    // };

    const handleViewBalance = (patientId) => {
        navigate('/view-balance', { state: { patientId } }); 
    };

>>>>>>> 9b6675f (Updated project)
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
<<<<<<< HEAD
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
=======
            <div className="page-background">
                <div className="patient-list-container">
                    <h1>Patients List</h1>
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
>>>>>>> 9b6675f (Updated project)
        </div>
    );
};

export default PatientList;
