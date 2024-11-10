import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Dummy data for charts
  const data1 = {
    labels: ['Internal', 'Resources'],
    datasets: [
      {
        data: [221, 207],
        backgroundColor: ['#A5C9CA', '#2B7A78'],
      },
    ],
  };

  const data2 = {
    labels: ['Crawled', 'Uncrawled'],
    datasets: [
      {
        data: [4678, 1493],
        backgroundColor: ['#6BBE92', '#D3D3D3'],
      },
    ],
  };

  const data3 = {
    labels: ['URLs without errors', 'URLs with errors'],
    datasets: [
      {
        data: [391, 37],
        backgroundColor: ['#6BBE92', '#E74C3C'],
      },
    ],
  };

  const issueData = {
    labels: ['Errors', 'Warnings', 'Notices'],
    datasets: [
      {
        data: [38, 558, 480],
        backgroundColor: ['#E74C3C', '#FFC107', '#3498DB'],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      {/* Container with Flexbox */}
      <div className="flex flex-col md:flex-row flex-wrap gap-6">  
              {/* Crawled URLs Distribution */}
        <div className="flex-1 w-[250px]  bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Crawled URLs Distribution</h2>
          {/* <Doughnut data={data1} /> */}
          <Doughnut
                data={{
                  labels: ['Score'],
                  datasets: [
                    {
                      data: [221,91],
                      backgroundColor: ['#A5C9CA', '#2B7A78'],
                    },
                  ],
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },
                  },
                }}
              />
          <div className="mt-4 text-sm text-gray-700">
            <p>Internal: 221</p>
            <p>Resources: 207</p>
          </div>
        </div>

        {/* Health Score */}
        <div className="flex-col w-[250px] bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Health Score</h2>
          <div className="flex justify-center items-center">
            <div className="relative w-40 h-40">
              <Doughnut
                data={{
                  labels: ['Score'],
                  datasets: [
                    {
                      data: [91, 9],
                      backgroundColor: ['#F39C12', '#D3D3D3'],
                    },
                  ],
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },
                  },
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-600">91</div>
            </div>
          </div>
          <p className="mt-2 text-center text-green-600">Excellent</p>
          <p className="text-center text-sm text-gray-600 mt-1">
            Health Score reflects the proportion of internal URLs on your site that don't have errors.
          </p>
        </div>

        {/* Crawl Status */}
        <div className="flex-col w-[250px] bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Crawl Status of Links Found</h2>
          <Doughnut data={data2} />
          <div className="mt-4 text-sm text-gray-700">
            <p>Crawled: 4,678</p>
            <p>Uncrawled: 1,493</p>
          </div>
        </div>

        {/* Issues Distribution */}
        <div className="flex-col w-[250px] bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Issues Distribution</h2>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32">
              <Doughnut data={issueData} />
            </div>
            <div className="text-sm text-gray-700">
              <p className="flex items-center">
                <span className="block w-3 h-3 bg-red-500 mr-2"></span> Errors: 38
              </p>
              <p className="flex items-center">
                <span className="block w-3 h-3 bg-yellow-500 mr-2"></span> Warnings: 558
              </p>
              <p className="flex items-center">
                <span className="block w-3 h-3 bg-blue-500 mr-2"></span> Notices: 480
              </p>
            </div>
          </div>
        </div>

        {/* Error Distribution */}
        <div className="flex-col w-[250px] bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Error Distribution</h2>
          <Doughnut data={data3} />
          <div className="mt-4 text-sm text-gray-700">
            <p>URLs without errors: 391</p>
            <p>URLs with errors: 37</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
