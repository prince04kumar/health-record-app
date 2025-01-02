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
    <div className="flex h-screen  " style={{ background: `url(${doctors.background})` }}>
      <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
      <h1> your Health</h1>
      <h2>Our Priority</h2>

      <button>
        <LoginButton text="Login" onClick={() => navigate('/patient-dashboard')} />
      </button>

      </div>
      <div className='w-1/2 hidden md:flex justify-center items-center '>
        <span className='bg-red-700 rounded-full h-[80%] w-[80%] contain md:flex justify-center items-center ' ><img className='contain' src="pngegg.png" alt="" /></span>
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