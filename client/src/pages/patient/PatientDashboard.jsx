import React from 'react';
import { useEffect } from 'react';
import SidePanel from './patientComponents/sidepannel';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
const PatientDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  return (
    <div className='flex h-screen'>
      <SidePanel />
      {/* Right panel will render different components based on the route */}
      <div className='flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;
