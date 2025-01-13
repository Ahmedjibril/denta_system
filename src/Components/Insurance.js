import React, { useEffect, useState } from "react";

const Insurance = () => {
  const [insurance, setInsurance] = useState([]);

  useEffect(() => {
    // Fetch data from your API for insurance
    fetch("http://localhost:8083/insurance")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setInsurance(data))
      .catch((error) => console.error("Error fetching insurance:", error));
  }, []);

  return (
    <div>
      <h2>Insurance</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Provider</th>
            <th>Policy Number</th>
            <th>Coverage Amount</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {insurance.map((ins) => (
            <tr key={ins.id}>
              <td>{ins.id}</td>
              <td>{ins.patient_id}</td>
              <td>{ins.provider}</td>
              <td>{ins.policy_number}</td>
              <td>{ins.coverage_amount}</td>
              <td>{ins.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Insurance;
