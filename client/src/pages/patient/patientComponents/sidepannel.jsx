import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserMd, FaFileAlt, FaHeartbeat, FaCalendarAlt, FaPills, FaChartLine } from 'react-icons/fa'

const SidePanel = () => {
  const [activeItem, setActiveItem] = useState('Doctors');

  const menuItems = [
    { icon: FaUserMd, text: 'Doctors', path: '/patient/doctors' },
    { icon: FaFileAlt, text: 'Reports', path: '/patient/reports' },
    { icon: FaHeartbeat, text: 'Health', path: '/patient/health' },
    { icon: FaCalendarAlt, text: 'Appointments', path: '/patient/appointments' },
    { icon: FaPills, text: 'Medications', path: '/patient/medications' },
    { icon: FaChartLine, text: 'Vitals', path: '/patient/vitals' },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white h-screen  sm:w-64 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 hidden sm:block">Patient Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 relative ${
                  activeItem === item.text ? 'bg-blue-600' : ''
                }`}
                onClick={() => setActiveItem(item.text)}
              >
                <item.icon className="text-xl" />
                {activeItem === item.text && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-white "></span>
                )}
                <span className="hidden sm:block">{item.text}</span>
                {/* {activeItem === item.text && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-white "></span>
                )} */}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidePanel;
