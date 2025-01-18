import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStethoscope } from 'react-icons/fa';
import { doctors } from '../../assets/doctors';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === 'All' || doctor.specialty === specialty)
  );

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  const handleAppointment = () => {
    navigate('/patient-dashboard/appointmentMake');
  };

  return (
    <div className="bg-white h-screen w-full p-6 overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Doctors</h2>

      {/* Search bar and filter */}
      <div className="flex mb-6 space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full p-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Doctors list */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="block" onClick={() => handleCardClick(doctor)}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <FaStethoscope className="mr-2" />
                  {doctor.specialty}
                </p>
                <p className="text-gray-500 mt-2">{doctor.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-500 font-semibold">{doctor.rating} ⭐</span>
                  <span className="text-gray-500">{doctor.experience}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className='flex justify-between'>
              <h3 className="text-2xl font-bold mb-4">{selectedDoctor.name}</h3>
              <button className="top-4 right-4 text-black" onClick={handleCloseModal}>X</button>
            </div>
            <p className="text-gray-600 mb-2"><FaStethoscope className="mr-2" />{selectedDoctor.specialty}</p>
            <p className="text-gray-500 mb-2">{selectedDoctor.location}</p>
            <p className="text-gray-500 mb-4">{selectedDoctor.experience}</p>
            <h2 className='underline text-gray-800'>About</h2>
            <p className='text-gray-500 mb-4'>{selectedDoctor.about}</p>
            <h2 className='underline text-gray-800'>Available Slots</h2>
            <ul className='text-gray-500 mb-4'>
              <li>Available day: 12/12/2000</li>
              <li>Available time : 12:00 PM</li>
              <li>Slots Available : 120</li>
            </ul>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleAppointment}>
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
