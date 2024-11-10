import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Top = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linktomap = () => {
    navigate('/Maps'); // Ensure this path matches the route defined for the maps page
  }
    

  return (
    <nav className="w-full bg-slate-500 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full mr-2" />
          <span className="text-xl font-bold">HealthRecord</span>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            ) : (
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            )}
          </svg>
        </button>

        <div className={`w-full md:w-auto md:flex-grow md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="md:flex-grow md:flex md:justify-center">
            <a href="#" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-300 mr-4">Home</a>
            <a href="#" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-300 mr-4">About</a>
            <a href="#" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-300 mr-4">Services</a>
            <a href="#" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-300">Contact</a>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="w-full md:w-auto bg-blue-400 rounded-3xl p-3 text-white hover:bg-blue-500 transition-colors" onClick={linktomap}>
              Nearby-Cares
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Top
