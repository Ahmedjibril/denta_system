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
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{1,14}$/;
        return phoneRegex.test(phone);
    };

    // Function to generate a single patient report based on phone number
    const generateSinglePatientReport = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Invalid phone number format.');
            return;
        }
        setError('');

        try {
            const response = await fetch(`http://localhost:8083/patients/report?phone_number=${phoneNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setReport(data);
            } else {
                const errorData = await response.json();
                setReport(null);
                setError(errorData.message || 'Error retrieving patient report.');
            }
        } catch (error) {
            setReport(null);
            setError(`Error: ${error.message}`);
        }
    };

    // Function to generate a report for all patients
    const generateAllPatientsReport = async () => {
        try {
            const response = await fetch('http://localhost:8083/patients/report/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setReport(data);
            } else {
                const errorData = await response.json();
                setReport(null);
                setError(errorData.message || 'Error retrieving all patients report.');
            }
        } catch (error) {
            setReport(null);
            setError(`Error: ${error.message}`);
        }
    };

    // Function to download the report as a PDF
    const downloadPDF = () => {
        if (!report) {
            alert('No report data available.');
            return;
        }
    
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.setFontSize(18);
        doc.text('Patient Report', 40, 40);
    
        // Table headers
        const headers = ["ID", "Name", "Phone Number", "Location", "Procedure", "Total Amount", "Amount Paid", "Balance"];
        const rows = [];
    
        // Check if the report is an array (multiple patients) or a single object
        if (Array.isArray(report)) {
            report.forEach(patient => {
                rows.push([
                    patient.id || 'N/A',
                    patient.name || 'N/A',
                    patient.phoneNumber || 'N/A',
                    patient.location || 'N/A',
                    patient.totalAmount || 'N/A',
                    patient.amountPaid || 'N/A',
                    patient.balance || 'N/A',
                ]);
            });
        } else if (typeof report === 'object' && report !== null) {
            rows.push([
                report.id || 'N/A',
                report.name || 'N/A',
                report.phoneNumber || 'N/A',
                report.location || 'N/A',
                report.totalAmount || 'N/A',
                report.amountPaid || 'N/A',
                report.balance || 'N/A',
            ]);
        } else {
            alert('Invalid report format.');
            return;
        }
    
        // Add table to PDF
        doc.autoTable({
            startY: 60,
            head: [headers],
            body: rows,
            theme: 'grid',
        });
    
        const fileName = `patient_report_${Array.isArray(report) ? 'all' : report.phoneNumber || 'single'}.pdf`;
        doc.save(fileName);
    };
    // Function to print the report in a new window
    const printReport = () => {
        if (!report) {
            alert('No report data available.');
            return;
        }
    
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        let tableRows = '';
    
        if (Array.isArray(report)) {
            report.forEach(patient => {
                tableRows += `
                    <tr>
                        <td>${patient.id || 'N/A'}</td>
                        <td>${patient.name || 'N/A'}</td>
                        <td>${patient.phoneNumber || 'N/A'}</td>
                        <td>${patient.location || 'N/A'}</td>
                        <td>${patient.totalAmount || 'N/A'}</td>
                        <td>${patient.amountPaid || 'N/A'}</td>
                        <td>${patient.balance || 'N/A'}</td>
                    </tr>
                `;
            });
        } else {
            tableRows = `
                <tr>
                    <td>${report.id || 'N/A'}</td>
                    <td>${report.name || 'N/A'}</td>
                    <td>${report.phoneNumber || 'N/A'}</td>
                    <td>${report.location || 'N/A'}</td>
                    <td>${report.totalAmount || 'N/A'}</td>
                    <td>${report.amountPaid || 'N/A'}</td>
                    <td>${report.balance || 'N/A'}</td>
                </tr>
            `;
        }
    
        printWindow.document.write(`
            <html>
            <head>
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 80%;
                        margin: 0 auto;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 10px;
                        text-align: left;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #007bff;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    .report-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .report-footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>Patient Report</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Total Amount</th>
                            <th>Amount Paid</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                <div class="report-footer">
                    <p>Report generated on ${new Date().toLocaleDateString()}</p>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
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
                <h6>Generate Patient Report</h6>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                />
                <button onClick={generateSinglePatientReport}>Generate Single Patient Report</button>
                <button onClick={generateAllPatientsReport}>Generate All Patients Report</button>
                <button onClick={downloadPDF}>Download PDF</button>
                <button onClick={printReport}>Print Report</button>
                {error && <div className="error-message">{error}</div>}
                {report && !error && (
                    <div className="report-output">
                        <h3>Report Output</h3>
                        <pre>{JSON.stringify(report, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientReport;