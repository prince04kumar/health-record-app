import React, { useState, useEffect } from "react";
import Top from "./components/Navbar/Top";
import Hero from "./components/hero";
import Loader from "./components/Loader/Loader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true); // State to control loading

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="dashboard h-[90%] w-full flex flex-col">
      <Top />
      <div className="">
        {isLoading ? <Loader /> : <Hero />} 
      </div>
    </div>
  );
};

export default Dashboard;
