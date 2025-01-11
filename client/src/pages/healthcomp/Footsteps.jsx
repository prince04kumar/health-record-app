import React from 'react';

const HealthDashboard = () => {
  // Progress values
  const weight = {
    current: 74.2,
    loss: 0.4,
    unit: 'kg'
  };

  const calories = {
    current: 253,
    total: 1342,
    unit: 'kCal'
  };

  const steps = {
    current: 7425,
    goal: 10000
  };

  // Calculate progress percentage for steps
  const stepsProgress = (steps.current / steps.goal) * 100;

  // Calculate the circle's circumference
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference}`;
  const strokeDashoffset = circumference - (stepsProgress / 100) * circumference;

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Top stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Weight Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Weight</div>
            <div className="text-xs text-gray-400">Lost {weight.loss}kg</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div className="bg-blue-600 h-full w-3/4 rounded-full"></div>
              </div>
              <span className="text-lg font-semibold">{weight.current}</span>
              <span className="text-sm text-gray-500">{weight.unit}</span>
            </div>
          </div>
        </div>

        {/* Calories Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Food</div>
            <div className="text-xs text-gray-400">{calories.current}/{calories.total} {calories.unit}</div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div 
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(calories.current / calories.total) * 100}%` }}
                ></div>
              </div>
              <span className="text-lg font-semibold">{calories.current}</span>
              <span className="text-sm text-gray-500">{calories.unit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Circle */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="relative w-48 h-48 mx-auto">
          {/* SVG Circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="stroke-gray-100"
              fill="none"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="stroke-blue-600 transition-all duration-500 ease-in-out"
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              style={{
                strokeDasharray,
                strokeDashoffset
              }}
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{steps.current.toLocaleString()}</span>
            <span className="text-gray-500">Steps</span>
            <span className="text-sm text-gray-400">{steps.goal.toLocaleString()} Steps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;