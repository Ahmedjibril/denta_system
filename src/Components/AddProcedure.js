import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './AddProcedure.css';

const AddProcedure = () => {
    const [patient, setPatient] = useState(null);
    const [procedureName, setProcedureName] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [dentistName, setDentistName] = useState('');
    const [notes, setNotes] = useState('');
    const [procedureOptions, setProcedureOptions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const patientId = location.state?.patientId;

    // Fetch patient details
    useEffect(() => {
        if (!patientId) {
            alert('Patient ID is missing');
            navigate('/procedure-table');
            return;
        }

        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8083/patients/${patientId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        fetchPatientDetails();
    }, [patientId, navigate]);

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8083/get/procedures');
                if (!response.ok) throw new Error('Failed to fetch procedures');
                const procedures = await response.json();
                setProcedureOptions(procedures);
            } catch (error) {
                console.error('Error fetching procedures:', error);
            }
        };
    
        fetchProcedures();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Number(totalAmount) < Number(amountPaid)) {
            alert("Amount paid cannot exceed the total amount");
            return;
        }

        const procedureData = {
            procedureName,
            amountPaid: Number(amountPaid),
            totalAmount: Number(totalAmount),
            patientId,
            dentistName,
            notes,
        };

        try {
            const response = await fetch('http://localhost:8083/patient_procedures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(procedureData),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            alert(`Procedure added successfully. Procedure ID:`);
            navigate('/procedure-table');
        } catch (error) {
            console.error('Error submitting procedure:', error);
            alert('Failed to add procedure');
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
                    <h1>Add Procedure</h1>
                    {patient && (
                        <div className="patient-info">
                            <p><strong>Patient Name:</strong> {patient.name}</p>
                            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                        </div>
                    )}

                    <label>Procedure Name:</label>
                    <select
    value={procedureName}
    onChange={(e) => setProcedureName(e.target.value)}
    required
>
    <option value="" disabled>Select Procedure</option>
    {procedureOptions.map((procedure) => (
        <option key={procedure} value={procedure.procedure_name}>
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

                    <label>Dentist Name:</label>
                    <select
                        value={dentistName}
                        onChange={(e) => setDentistName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Dentist</option>
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

                    <button type="submit">Add Procedure</button>
                </form>
            </div>
        </div>
    );
};

export default AddProcedure;
