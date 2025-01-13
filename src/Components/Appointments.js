import React, { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch data from your API for appointments
    fetch("http://localhost:8083/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Dentist ID</th>
            <th>Appointment Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.dentist_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
              <td>{appointment.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
