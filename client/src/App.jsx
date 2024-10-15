import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from "./Dashboard"
import Login from './services/Login';
import PatientDashboard from './pages/patient/PatientDashboard';
function App() {

  return (
    <>
     
       <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
        </Routes>
       </Router>

    </>
  )
}

export default App
