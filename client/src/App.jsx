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
import Profile from './pages/patient/Profile';
import Maps from './Maps';
import Health from './pages/patient/Health';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import AppointmentMake from './pages/patient/AppointmentMake';
import AppointmentDisplay from './pages/patient/Appointmentdisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor-login" element={<DoctorsLogin />} />
        <Route path="/patient-login" element={<Login />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/ContactUs" element={<ContactUs />} />

         {/* Nested routing for PatientDashboard */}  

         <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>} >
          <Route index element={<Doctors/>} />
          <Route path="reports" element={<Report/>} />
          <Route path="appointmentMake" element={<AppointmentMake/>} />
          <Route path="appointmentdisplay" element={<AppointmentDisplay/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="health" element = {<Health/>} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
