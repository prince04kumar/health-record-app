import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStethoscope } from 'react-icons/fa';
import { doctors, doctorImages } from '../../assets/doctors';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All');
  
  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === 'All' || doctor.specialty === specialty)
  );

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
        {filteredDoctors.map((doctor, index) => (
          <Link to={`/patient/doctor/${doctor.id}`} key={doctor.id} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className='h-[50%]'>    <img 
                src={doctorImages[index % doctorImages.length]} 
                alt={doctor.name} 
                className="w-full h-[50%] object-cover object-center"
              />
              </div>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
