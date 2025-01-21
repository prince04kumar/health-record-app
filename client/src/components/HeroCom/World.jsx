import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {ComposableMap, Geographies, Geography, Marker} from 'react-simple-maps';


const World = () => {

  const geoUrl ="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
  const markers = [
    { coordinates: [-74.006, 40.7128], name: "New York" },
    { coordinates: [2.3522, 48.8566], name: "Paris" },
    { coordinates: [139.6917, 35.6895], name: "Tokyo" },
    { coordinates: [77.1025, 28.7041], name: "New Delhi" },
  ];

  return (
    <div className="h-full md:h-[70vh] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-28"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 md:mb-40">
          {/* Left Column - Text Content */}
          <div className="space-y-6 relative lg:-left-20 lg:-top-10">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dm-serif-display-regular"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Find Your Nearest Doctors and Hospitals
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
                Book appointment with the best doctors and hospitals near you. Get the fastest treatment from your nearby hospital.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                
              >
                Login now!
              </motion.button>
              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Learn more
              </motion.button>
            </div>
          </div>

          {/* Right Column - Cards and Illustrations */}
          
        <ComposableMap
            projectionConfig={{ scale: 70 }} // Scale of the map
            width={350}
            height={175}
        >
            {/* Render Geographies */}
            <Geographies geography={geoUrl}>
            {({ geographies }) =>
                geographies.map((geo) => (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                    default: { fill: "#E0E0E0", outline: "none" }, 
                    hover: { fill: "#99f", outline: "none" }, 
                    pressed: { fill: "#00f", outline: "none" },
                    }}
                />
                ))
            }
            </Geographies>

            {/* Add Markers */}
            {markers.map(({ coordinates, name }, index) => (
            <Marker key={index} coordinates={coordinates}>
                <circle r={5} fill="#0000FF" stroke="#fff" strokeWidth={1.5} />
                <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "Arial", fontSize: "10px", fill: "#00f" }}
                >
                {name}
                </text>
            </Marker>
            ))}
      </ComposableMap>
        </div>
       </div>
      <div> 
      </div>
    </div>
  );
};

export default World;