import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './AddProcedure.css';

const AddProcedure = () => {
    const [patient, setPatient] = useState(null);
    const [procedureName, setProcedureName] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [balance, setBalance] = useState(0);
    const [dentistName, setDentistName] = useState('');
    const [notes, setNotes] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const patientId = location.state?.patientId;

    useEffect(() => {
        if (!patientId) {
            alert('Patient ID is missing');
            navigate('/procedure-table');
            return;
        }
        console.log('Patient ID:', patientId); // Check the patient ID here
        const fetchPatientDetails = async () => {
            try {
                console.log(patientId);
                const response = await fetch(`http://localhost:8083/patients/${patientId}`); // Ensure URL is correct
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };
    
        fetchPatientDetails();
    }, [patientId, navigate]);
    

    // useEffect(() => {
    //     setBalance(Number(totalAmount) - Number(amountPaid));
    // }, [totalAmount, amountPaid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Number(totalAmount) < Number(amountPaid)) {
            alert("Amount paid cannot be more than total Amount");
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
            const response = await fetch(`http://localhost:8083/patient_procedures`, { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(procedureData),
});


            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            alert('Procedure added successfully');
            navigate('/procedure-table');
        } catch (error) {
            console.error('Error submitting procedure:', error);
            alert('Failed to add procedure');
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Logout</Link></li>
                    <li><Link to="/add-patient">Add Patient</Link></li>
                    <li><Link to="/patient-list">Patient List</Link></li>
                    <li><Link to="/update-balance">Update Balance</Link></li>
                    <li><Link to="/procedure-table">ProcedureTable</Link></li>
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
    <option value="" disabled selected>Select a procedure</option>
    <option value="Braces">Braces</option>
    <option value="Root Canal">Root Canal</option>
    <option value="Extractions">Extractions</option>
    <option value="Normal Fillings">Normal Fillings</option>
    <option value="Permanent Teeth">Permanent Teeth</option>
    <option value="Retainer">Retainer</option>
    <option value="Whitening">Whitening</option>
    <option value="Color/Dabar">Color/Dabar</option>
    <option value="Dental Implants">Dental Implants</option>
    <option value="Veneers">Veneers</option>
    <option value="Crowns">Crowns</option>
    <option value="Bridges">Bridges</option>
    <option value="Invisalign">Invisalign</option>
    <option value="Deep Cleaning">Deep Cleaning</option>
    <option value="Scaling and Root Planing">Scaling and Root Planing</option>
    <option value="Gum Surgery">Gum Surgery</option>
    <option value="Tooth Bonding">Tooth Bonding</option>
    <option value="Dentures">Dentures</option>
    <option value="Fluoride Treatment">Fluoride Treatment</option>
    <option value="Sealants">Sealants</option>
    <option value="Night Guards">Night Guards</option>
    <option value="Oral Cancer Screening">Oral Cancer Screening</option>
    <option value="Wisdom Teeth Removal">Wisdom Teeth Removal</option>
    <option value="Teeth Polishing">Teeth Polishing</option>
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