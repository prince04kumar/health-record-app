import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaFileAlt, FaHeartbeat, FaCalendarAlt, FaPills, FaChartLine , FaUser, FaHome} from 'react-icons/fa';

const SidePanel = () => {
  const [activeItem, setActiveItem] = useState('Doctors');

  const menuItems = [
    { icon: FaHome, text: 'Home', path: '/' },
    { icon: FaUserMd, text: 'Doctors', path: '/patient-dashboard/' },
    { icon: FaFileAlt, text: 'Reports', path: '/patient-dashboard/reports' },
    { icon: FaHeartbeat, text: 'Health', path: '/patient-dashboard/health' },
    { icon: FaCalendarAlt, text: 'Appointments', path: '/patient-dashboard/appointments' },
    { icon: FaPills, text: 'Medications', path: '/patient-dashboard/medications' },
    { icon: FaChartLine, text: 'Vitals', path: '/patient-dashboard/vitals' },
    {icon : FaUser  , text : 'Profile', path : '/patient-dashboard/profile'}
  ];

  return (
    <div className="bg-gradient-to-b min-h-screen  from-blue-500 to-blue-700 text-white h-screen sm:w-64 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 hidden sm:block">Patient Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path} // Use the route path for linking
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 relative ${
                  activeItem === item.text ? 'bg-blue-600' : ''
                }`}
                onClick={() => setActiveItem(item.text)}
              >
                <item.icon className="text-xl" />
                <span className="hidden sm:block">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidePanel;
