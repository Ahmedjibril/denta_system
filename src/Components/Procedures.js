// import React, { useEffect, useState } from "react";

// const Procedures = () => {
//   const [procedures, setProcedures] = useState([]);

//   useEffect(() => {
//     // Fetch data from your API for procedures
//     fetch("http://localhost:8083/procedures")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => setProcedures(data))
//       .catch((error) => console.error("Error fetching procedures:", error));
//   }, []);

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
//           {procedures.map((procedure) => (
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
