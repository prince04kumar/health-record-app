import React, { useEffect, useState } from 'react';
import doctors from '../assets/doctors';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [slideIn, setSlideIn] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
    setTimeout(() => {
      setFadeIn(true);
    }, 1000); // Delay for "Our Priority" to appear after "Your Health"
  }, []);

  return (
    <div className="flex  h-screen" style={{ background: `url(${doctors.background})` }}>
      <div className="flex flex-col items-center justify-center w-1/2 p-4">
        <h1 className={`text-4xl md:text-6xl font-extrabold text-white text-center font-poppins mb-8 transform transition-transform duration-1000 ${slideIn ? 'translate-y-0' : '-translate-y-full'}`}>
          <span className="block">Your Health</span>
          <span className={`block text-yellow-300 text-2xl md:text-4xl mt-2 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>Our Priority</span>
        </h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <LoginButton text="Login as Doctor" onClick={() => navigate('/doctor-login')} />
          <LoginButton text="Login as Patient" onClick={() => navigate('/patient-login')} />
          <LoginButton text="Login as Admin" onClick={() => navigate('/admin-login')} />
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 p-4">
        <img src={doctors.sideimg} alt="Side" className="h-[100%] w-[70%] mix-blend-multiply" />
      </div>
    </div>
  );
};

const LoginButton = ({ text, onClick }) => (
  <button
    className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:bg-blue-100 transition-colors duration-300 w-full md:w-auto"
    onClick={onClick}
  >
    {text}
  </button>
);

export default Hero;