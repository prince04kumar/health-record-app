import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartIcon,
  FireIcon,
  BeakerIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Footsteps from "../healthcomp/Footsteps";
import Heart from "../healthcomp/Heart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const HealthDashboard = () => {
  const [healthStats, setHealthStats] = useState([
    {
      id: 1,
      name: "Heart",
      value: 75,
      icon: <HeartIcon className="h-6 w-6 text-red-500" />,
    },
    {
      id: 2,
      name: "Lungs",
      value: 90,
      icon: <FireIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 3,
      name: "Stomach",
      value: 13,
      icon: <BeakerIcon className="h-6 w-6 text-yellow-500" />,
    },
    {
      id: 4,
      name: "Liver",
      value: 44,
      icon: <DevicePhoneMobileIcon className="h-6 w-6 text-green-500" />,
    },
  ]);

  const handleHealthInputSubmit = (newStats) => {
    setHealthStats((prevStats) =>
      prevStats.map((stat) => ({
        ...stat,
        value: newStats[stat.name.toLowerCase()],
      }))
    );
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "BMI",
        data: [30, 32, 29, 27, 23, 24],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Your Activity",
        data: [97, 93, 82, 77, 86, 90],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Health Score",
        data: [65, 71, 74, 83, 86, 91],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-10">
      <header className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Health Diagnosis
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">This Day</span>
          <button className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left Section */}
        <motion.div
          className="col-span-1 bg-white rounded-lg shadow-md p-4 flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/heart1.png" alt="Heart" className="w-full h-64" />
          <div>
            {healthStats.map((stat) => (
              <div
                key={stat.id}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <span className="font-medium text-gray-700">{stat.name}</span>
                </div>
                <span className="font-bold text-gray-900">{stat.value}%</span>
              </div>
            ))}
          </div>
          <Footsteps />
        </motion.div>

        {/* Middle Section */}
        <motion.div
          className="col-span-1 bg-white rounded-lg shadow-md p-4 flex flex-col"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart />
          <div className="flex flex-col w-full bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Health Score</h2>
            <div className="flex justify-center items-center">
              <div className="relative w-40 h-40">
                <Doughnut
                  data={{
                    labels: ["Score"],
                    datasets: [
                      {
                        data: [91, 9],
                        backgroundColor: ["#F39C12", "#D3D3D3"],
                      },
                    ],
                  }}
                  options={{
                    cutout: "70%",
                    plugins: {
                      tooltip: { enabled: false },
                      legend: { display: false },
                    },
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-600">
                  91
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-green-600">Excellent</p>
            <p className="text-center text-sm text-gray-600 mt-1">
              Health Score reflects your overall health performance.
            </p>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="col-span-1 bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Health Stats</h2>
          <img src="/body1.png" alt="Body Stats" className="w-full h-full" />
          <div className="h-full flex flex-col justify-center">
            <span className="text-2xl font-bold text-gray-800">Body Stats</span>
            <span className="text-sm text-gray-600">
              Your body stats for the day:{" "}
              <span className="text-blue-500 font-bold">Good</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Line Chart */}
      <div className="w-full max-w-6xl mt-6 bg-white rounded-lg shadow-md p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Health Performance</h1>
        <Line data={data} options={options} title="Your Performance"/>
      </div>

      
    </div>
  );
};

export default HealthDashboard;
