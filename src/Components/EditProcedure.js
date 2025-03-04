import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './AddProcedure.css';

const EditProcedure = () => {
    const [patient, setPatient] = useState(null);
    const [oldProcedureName, setOldProcedureName] = useState('');
    const [newProcedureName, setNewProcedureName] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [dentistName, setDentistName] = useState('');
    const [procedureOptions, setProcedureOptions] = useState([]);
    const [notes, setNotes] = useState('');
    const [balance, setBalance] = useState(0); // Balance state

    const location = useLocation();
    const navigate = useNavigate();
    
    const patientId = location.state?.patientId;
    const initialOldProcedure = location.state?.procedureName;

    useEffect(() => {
        if (!patientId) {
            alert('Missing patient or procedure details. Redirecting...');
            navigate('/procedure-table');
            return;
        }

        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8083/patients/${patientId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
                alert('Failed to fetch patient details.');
            }
        };

        fetchPatientDetails();
    }, [patientId, navigate]);

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8083/get/procedures');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const data = await response.json();
                setProcedureOptions(data);
            } catch (error) {
                console.error('Error fetching procedures:', error);
                alert('Failed to load procedure options.');
            }
        };

        fetchProcedures();
        setOldProcedureName(initialOldProcedure || '');
    }, [initialOldProcedure]);

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Number(totalAmount) < Number(amountPaid)) {
            alert("Amount paid cannot be more than total amount.");
            return;
        }
        const procedureData = {
            patientId,
            oldProcedureName,
            newProcedureName,
            totalAmount,
            amountPaid,
            dentistName,
            balance, 
            notes
        };
        

        try {
            const response = await fetch(`http://localhost:8083/edit-procedure`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(procedureData),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            alert('Procedure updated successfully');
            navigate('/procedure-table');
        } catch (error) {
            console.error('Error updating procedure:', error);
            alert('Failed to update procedure');
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
                    <li><Link to="/procedure-table">Procedure Table</Link></li>
                </ul>
            </nav>

            <div className="add-procedure-form-container">
                <form className="add-procedure-form" onSubmit={handleSubmit}>
                    <h1>Edit Procedure</h1>
                    {patient && (
                        <div className="patient-info">
                            <p><strong>Patient Name:</strong> {patient.name}</p>
                            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                        </div>
                    )}

                    <label>Old Procedure Name:</label>
                    <select
                        value={oldProcedureName}
                        onChange={(e) => setOldProcedureName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Old Procedure</option>
                        {procedureOptions.map((procedure) => (
                            <option key={procedure.procedure_id} value={procedure.procedure_name}>
                                {procedure.procedure_name}
                            </option>
                        ))}
                    </select>

                    <label>New Procedure Name:</label>
                    <select
                        value={newProcedureName}
                        onChange={(e) => setNewProcedureName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select New Procedure</option>
                        {procedureOptions.map((procedure) => (
                            <option key={procedure.procedure_id} value={procedure.procedure_name}>
                                {procedure.procedure_name}
                            </option>
                        ))}
                    </select>

                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />

                    <label>Amount Paid:</label>
                    <input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        required
                    />
{/* 
                    <label>Balance:</label>
                    <input
                        type="text"
                        value={balance >= 0 ? `${balance} (Remaining)` : `${Math.abs(balance)} (Refund)`}
                        readOnly
                        style={{ backgroundColor: balance < 0 ? 'lightgreen' : 'lightcoral', fontWeight: 'bold' }}
                    /> */}

                    <label>Dentist Name:</label>
                    <select
                        value={dentistName}
                        onChange={(e) => setDentistName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a dentist</option>
                        <option value="Dr. Olulo">Dr. Olulo</option>
                        <option value="Dr. Ahmed">Dr. Ahmed</option>
                        <option value="Dr. Angela Martinez">Dr. Angela Martinez</option>
                        <option value="Dr. Robert Hall">Dr. Robert Hall</option>
                        <option value="Dr. Patricia Clark">Dr. Patricia Clark</option>
                        <option value="Dr. James">Dr. James</option>
                        <option value="Dr. Hudson">Dr. Hudson</option>
                        <option value="Dr. Mark">Dr. Mark</option>
                    </select>

                    <label>Notes:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <button type="submit">Update Procedure</button>
                </form>
            </div>
        </div>
    );
};

export default EditProcedure;
