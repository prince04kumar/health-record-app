import React from 'react';
import SidePanel from './patientComponents/sidepannel';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing

const PatientDashboard = () => {
  return (
    <div className='flex'>
      <SidePanel />
      {/* Right panel will render different components based on the route */}
      <div className='flex-1 '>
        <Outlet /> {/* This will render the matched child routes */}
      </div>
    </div>
  );
};

export default PatientDashboard;
