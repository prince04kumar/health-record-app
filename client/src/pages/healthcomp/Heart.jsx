import React, { useState, useEffect } from 'react';
import { Heart, ArrowUpRight, Thermometer } from 'lucide-react';

const HeartRateGraph = () => {
  const [points, setPoints] = useState('');
  const width = 120;
  const height = 40;
  const totalPoints = 20;

  useEffect(() => {
    const generatePoints = () => {
      let pointsArray = [];
      for (let i = 0; i < totalPoints; i++) {
        const x = (width / totalPoints) * i;
        const y = height/2 + (Math.random() * 15 - 7.5);
        pointsArray.push(`${x},${y}`);
      }
      return pointsArray.join(' ');
    };

    const interval = setInterval(() => {
      setPoints(generatePoints());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-500"
      />
    </svg>
  );
};

const TemperatureGraph = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 40" preserveAspectRatio="none">
      <path
        d="M0,20 C30,20 30,10 60,20 S90,30 120,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-500"
      />
    </svg>
  );
};

const BloodStatusGraph = () => {
  const [barHeights, setBarHeights] = useState(Array(12).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights(barHeights.map(() => Math.random() * 30 + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="0 0 120 40" preserveAspectRatio="none">
      {barHeights.map((height, index) => (
        <rect
          key={index}
          x={index * 11}
          y={(40 - height) / 2}
          width="8"
          height={height}
          rx="2"
          className="text-gray-200 fill-current"
          opacity={0.5}
        />
      ))}
    </svg>
  );
};

const MetricCard = ({ icon, title, value, subtitle, graph: Graph }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon}
          <div>
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
        <span className="text-lg font-semibold">{value}</span>
      </div>
      <div className="h-10">
        <Graph />
      </div>
    </div>
  );
};

const HealthDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Heart Rate */}
        <MetricCard
          icon={<Heart className="w-5 h-5 text-red-500" />}
          title="Heart Rate"
          value="124 bpm"
          subtitle="Normal"
          graph={HeartRateGraph}
        />

        {/* Temperature */}
        <MetricCard
          icon={<Thermometer className="w-5 h-5 text-blue-500 " />}
          title="Temperature"
          value="37.1°"
          subtitle="Normal"
          graph={TemperatureGraph}
        />

        {/* Blood Status */}
        <MetricCard
          icon={<div className="w-5 h-5 rounded-full bg-red-500" />}
          title="Blood Status"
          value="102/70"
          subtitle="Normal"
          graph={BloodStatusGraph}
        />
      </div>

      {/* Sleep Time Bar */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900">Sleep time</h3>
          <span className="text-sm text-gray-500">7:30h</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: '75%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">00:30</span>
          <span className="text-xs text-gray-500">08:00</span>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;