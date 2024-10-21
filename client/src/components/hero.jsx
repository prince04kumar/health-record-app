import React from 'react';
import doctors from '../assets/doctors';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4" style={{ background: `url(${doctors.background})` }}>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center font-poppins mb-8">
        <span className="block">Your Health</span>
        <span className="block text-yellow-300 text-2xl md:text-4xl mt-2">Our Priority</span>
      </h1>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LoginButton text="Login as Doctor" onClick={() => navigate('/doctor-login')} />
        <LoginButton text="Login as Patient" onClick={() => navigate('/patient-login')} />
        <LoginButton text="Login as Admin" onClick={() => navigate('/admin-login')} />
      </div>
    </div>
  );
};

const LoginButton = ({ text,  onClick }) => (
  <button
    className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:bg-blue-100 transition-colors duration-300 w-full md:w-auto"
    onClick={onClick}
  >
    {text}
  </button>
);

export default Hero;