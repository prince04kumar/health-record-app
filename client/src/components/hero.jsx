import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopCho from "../pages/healthcomp/TopCho";
import About from "../pages/healthcomp/About";  
import { useNavigate } from 'react-router-dom'
import Footer from "./Footer";

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const enter = () => {
    navigate('/patient-login');
  }

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 1000); // Delay for spans and image to appear after "Healthcare"
  }, []);

  return (
    <div className="bg-white flex items-center justify-center p-4 flex flex-col ">
      <div className="bg-[#252C62] text-white rounded-3xl shadow-lg  w-[90%] h-[70%]">
        <div className="flex flex-col items-center justify-between space-y-8 md:space-y-0">
          <div className="">
            <h1 className="text-6xl md:text-[12rem] font-bold">Healthcare</h1>
          </div>
          {showContent && (
           
              <div className="flex flex-col items-center justify-center relative top-[-5rem] gap-">
                <section className="flex">
                  <p className="hidden md:flex items-center text-lg">
                    <span className="bg-pink-500 p-2 rounded-full mr-3">
                      🩸
                    </span>
                    Reduce HbA1c
                  </p>{" "}
                  <img
                    src="/doc3.png"
                    alt="Doctor"
                    className="w-64 md:w-[28rem] rounded-2xl shadow-md"
                  />
                  <p className="hidden md:flex items-center text-lg">
                    <span className="bg-green-500 p-2 rounded-full mr-3">
                      💊
                    </span>
                    No more medications
                  </p>{" "}
                </section>
                <p className="mt-6 text-sm text-gray-300">
                  Get the best healthcare services from the top doctors in the
                  country.
                </p>
                <Link to="/patient-login">
                  <button className="mt-6 mb-0 bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition " onClick={()=>enter}>
                   ENTER →
                  </button>
                </Link>
              </div>
          
          )}
        </div>
      </div>
      <TopCho /> 
      <About /> 
      <Footer />
    </div>
  );
};

export default Hero;
