import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PatientReport.css';

const PatientReport = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  // Validate phone number format (up to 14 digits)
  const validatePhoneNumber = (phone) => /^[0-9]{1,14}$/.test(phone);

  const generateSinglePatientReport = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid phone number format.');
      return;
    }
    setError('');
    setReport(null);
  
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (!token) {
      setError('Authorization token is missing.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8083/patients/report?phone_number=${phoneNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          setReport(data);
        } else {
          setError('No data found for the patient.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch the patient report.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };
  

  const generateAllPatientsReport = async () => {
    setError('');
    setReport(null);
  
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      setError('Authorization token is missing.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8083/patients/report/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('All patients report data:', data);
        if (Array.isArray(data) && data.length > 0) {
          setReport(data);
        } else {
          setError('No data found for all patients.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch all patients report.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };
  
  // Function to download the report as a PDF
  const downloadPDF = () => {
    if (!report) {
      alert('No report data available.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Patient Report', 20, 20);

    const headers = ["ID", "Procedure Name", "Total Amount", "Amount Paid", "Balance"];
    const rows = Array.isArray(report) ? report.map(patient => [
      patient.id || 'N/A',
      patient.procedure || 'N/A',
      patient.totalAmount || 'N/A',
      patient.amountPaid || 'N/A',
      patient.balance || 'N/A',
    ]) : [[
      report.id || 'N/A',
      report.procedure || 'N/A',
      report.totalAmount || 'N/A',
      report.amountPaid || 'N/A',
      report.balance || 'N/A',
    ]];

    doc.autoTable({
      startY: 30,
      head: [headers],
      body: rows,
      theme: 'grid',
    });

    doc.save(`patient_report_${Array.isArray(report) ? 'all' : phoneNumber}.pdf`);
  };

  // Function to print the report
  const printReport = () => {
    if (!report) {
      alert('No report data available.');
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Patient Report</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Procedure Name</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${
                Array.isArray(report) 
                  ? report.map(patient => `
                    <tr>
                      <td>${patient.id || 'N/A'}</td>
                      <td>${patient.procedure || 'N/A'}</td>
                      <td>${patient.totalAmount || 'N/A'}</td>
                      <td>${patient.amountPaid || 'N/A'}</td>
                      <td>${patient.balance || 'N/A'}</td>
                    </tr>`).join('') 
                  : `
                    <tr>
                      <td>${report.id || 'N/A'}</td>
                      <td>${report.procedure || 'N/A'}</td>
                      <td>${report.totalAmount || 'N/A'}</td>
                      <td>${report.amountPaid || 'N/A'}</td>
                      <td>${report.balance || 'N/A'}</td>
                    </tr>`
              }
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
      <div className="patient-report-container">
        <h2>Generate Patient Report</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={generateSinglePatientReport}>Generate Single Report</button>
        <button onClick={generateAllPatientsReport}>Generate All Reports</button>
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={printReport}>Print Report</button>
        {error && <p className="error">{error}</p>}
        {report && <pre className="report-output">{JSON.stringify(report, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default PatientReport;
