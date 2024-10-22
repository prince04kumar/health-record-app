import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./Dashboard";
import Login from './services/Patientlogin';
import PatientDashboard from './pages/patient/PatientDashboard';
import Application from './pages/doctors/Application';
import DoctorsLogin from './services/DoctorsLogin';
import AdminLogin from './services/AdminLogin';
import ProtectedRoute from './components/protectedRoute';
import Doctors from './pages/patient/Doctors';
import Report from './pages/patient/Report';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor-login" element={<DoctorsLogin />} />
        <Route path="/patient-login" element={<Login />} />
         {/* Nested routing for PatientDashboard */}  

      <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>} >
          <Route path="doctors" element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
          <Route path="reports" element={<ProtectedRoute><Report/></ProtectedRoute>} />
          {/* <Route path="health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
          <Route path="appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="medications" element={<ProtectedRoute><Medications /></ProtectedRoute>} />
          <Route path="vitals" element={<ProtectedRoute><Vitals /></ProtectedRoute>}/> */}
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
