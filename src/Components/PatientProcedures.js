import React, { useEffect, useState } from "react";

const PatientProcedures = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    // Fetch data from your API for patient procedures
    fetch("http://localhost:8083/patient-procedures")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProcedures(data))
      .catch((error) => console.error("Error fetching procedures:", error));
  }, []);

  // Group procedures by patient_id
  const groupedByPatient = procedures.reduce((acc, procedure) => {
    const patientId = procedure.patient_id;
    if (!acc[patientId]) {
      acc[patientId] = [];
    }
    acc[patientId].push(procedure);
    return acc;
  }, {});

  // Helper function to calculate total balance for each patient
  const calculateTotalBalance = (patientProcedures) => {
    return patientProcedures.reduce((acc, procedure) => acc + procedure.balance, 0);
  };

  return (
    <div>
      <h2>Patient Procedures</h2>
      {Object.entries(groupedByPatient).map(([patientId, patientProcedures]) => (
        <div key={patientId} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Patient ID: {patientId}</h3>
          <table border="1" style={{ marginTop: "10px", width: "100%" }}>
            <thead>
              <tr>
                <th>Procedure Name</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Dentist Name</th>
                <th>Notes</th>
        
              </tr>
            </thead>
            <tbody>
              {patientProcedures.map((procedure) => (
                <tr key={procedure.id}>
                  <td>{procedure.procedure_name}</td>
                  <td>{procedure.total_amount}</td>
                  <td>{procedure.amount_paid}</td>
                  <td>{procedure.dentist_name}</td>
                  <td>{procedure.notes}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total Balance:</td>
                <td colSpan="2" style={{ fontWeight: "bold" }}>{calculateTotalBalance(patientProcedures)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PatientProcedures;
