// import React, { useEffect, useState } from "react";

// const Procedures = () => {
//     const [procedureOptions, setProcedureOptions] = useState([]);

//   // Fetching the procedure options
//   useEffect(() => {
//     const fetchProcedures = async () => {
//         try {
//             const response = await fetch('http://localhost:8083/get/procedures');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch procedures');
//             }
//             const procedures = await response.json();
//             console.log('Fetched Procedures:', procedures); // Check if data is fetched
//             setProcedureOptions(procedures);
//         } catch (error) {
//             console.error('Error fetching procedures:', error);
//         }
//     };

//     fetchProcedures();
// }, []);

//   return (
//     <div>
//       <h2>Procedures</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {setProcedureOptions.map((procedure) => (
//             <tr key={procedure.id}>
//               <td>{procedure.id}</td>
//               <td>{procedure.name}</td>
//               <td>{procedure.description}</td>
//               <td>{procedure.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Procedures;
