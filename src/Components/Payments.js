import React, { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch data from your API for payments
    fetch("http://localhost:8083/payments")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Procedure ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.patient_id}</td>
              <td>{payment.procedure_id}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>{payment.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
