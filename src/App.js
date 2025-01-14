import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPatientForm from './Components/AddPatientForm';
import PatientList from './Components/PatientList';
import UpdateBalanceForm from './Components/UpdateBalanceForm';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import PatientReport from './Components/PatientReport';
import AuthRoute from './Components/AuthRoute'; // Import the AuthRoute component
import Procedures from './Components/Procedures';
import AddProcedure from './Components/AddProcedure';
import PatientProcedures from './Components/PatientProcedures';
import ProcedureTable from './Components/ProcedureTable';
import EditProcedure from './Components/EditProcedure';
import ViewBalance from './Components/ViewBalance';
import CreateUserForm from './Components/CreateUserForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/add-patient" element={<AuthRoute element={AddPatientForm} />} />
                <Route path="/patient-list" element={<AuthRoute element={PatientList} />} />
                <Route path="/procedures" element={<Procedures />} />
                <Route path="/add-procedure" element={<AddProcedure />} />
                <Route path="/edit-procedure" element={<EditProcedure />} />
                <Route path="/view-balance" element={<ViewBalance />} />
                <Route path="/procedure-table" element={<ProcedureTable />} />
                <Route path="/patient-procedure" element={<AuthRoute element={PatientProcedures} />} />
                <Route path="/update-balance" element={<AuthRoute element={UpdateBalanceForm} />} />
                <Route path="/patient-report" element={<AuthRoute element={PatientReport} />} />
                <Route path="/create-user" element={<CreateUserForm />} />
            </Routes>
        </Router>
    );
};

export default App;
