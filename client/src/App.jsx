import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from "./Dashboard"
import Login from './services/Patientlogin';
import PatientDashboard from './pages/patient/PatientDashboard';
import Application from './pages/doctors/Application';
import DoctorsLogin from './services/DoctorsLogin';
import AdminLogin from './services/AdminLogin';
function App() {

  return (
    <>
     
       <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctor-login" element={  <DoctorsLogin/>} />
          <Route path="/patient-login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin/>} />
        </Routes>
       </Router> 
      
     

    </>
  )
}

export default App
