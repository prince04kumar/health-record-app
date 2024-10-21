import React from 'react'
import Top from './components/Navbar/Top'
import Hero from './components/hero'

const Dashboard = () => {
  return (
    <div className="dashboard h-[90%] w-full flex flex-col">
      <Top />
      <div className="flex-grow ">
        <Hero />
        
      </div>
    </div>
  )
}

export default Dashboard
