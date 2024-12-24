import React from "react";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      {/* Loader container */}
      <div className="relative w-48 h-48">
        {/* Rotating circle */}
        <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Red cross */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Vertical bar */}
          <div className="bg-red-500 w-8 h-24 mx-auto"></div>
          {/* Horizontal bar */}
          <div className="bg-red-500 w-24 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Text below the loader */}
      <h1 className="mt-6 text-2xl font-bold text-gray-800 text-center">
        YOUR HEALTH OUR PRIORITY
      </h1>
    </div>
  );
};

export default App;
