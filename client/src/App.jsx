import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./Dashboard";
import Login from './services/Patientlogin';
import PatientDashboard from './pages/patient/PatientDashboard';
// import Application from './pages/doctors/Application';
import DoctorsLogin from './services/DoctorsLogin';
import AdminLogin from './services/AdminLogin';
import ProtectedRoute from './components/protectedRoute';
import Doctors from './pages/patient/Doctors';
import Report from './pages/patient/Report';
import Appointment from './pages/patient/Appointment';
import Profile from './pages/patient/Profile';
import Maps from './pages/patient/maps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor-login" element={<DoctorsLogin />} />
        <Route path="/patient-login" element={<Login />} />
        <Route path="/maps" element={<Maps />} />
         {/* Nested routing for PatientDashboard */}  

      <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>} >
          <Route  index element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
          <Route path="reports" element={<ProtectedRoute><Report/></ProtectedRoute>} />
          <Route path="Appointments" element={<ProtectedRoute><Appointment/></ProtectedRoute>} />
          <Route path="Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
         
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
