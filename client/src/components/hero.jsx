import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopCho from './HeroCom/TopCho';

const CampaignCard = ({ image, title, category, viewMore }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4 border-2">
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-40 h-32">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {category}
          </span>
          <a href="#" className="text-blue-500 text-sm hover:underline">
            View more
          </a>
        </div>
        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-500 h-full rounded-full w-3/5"></div>
        </div>
      </div>
    </div>
  </div>
);



const LandingPage = () => {
  const navigate = useNavigate();
  const enterLogin = () => {
    navigate("/patient-login")
 }
  const campaigns = [
    {
      image: "/recordimage",
      title: "Access Your Record Anywhere Anytime",
      category: "Education",
    },
    {
      image: "/api/placeholder/160/128",
      title: "Provide Urgent Medical Attention",
      category: "Physical Healthy",
    },
    {
      image: "/api/placeholder/160/128",
      title: "Nourishing Hope: Serving Food",
      category: "Food Security",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Text Content */}
          <div className="space-y-6 relative lg:-left-20 lg:-top-10">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 "
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Make changes and help the world
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hope for Tomorrow non-profit organisation that collaborates with
              volunteers to deliver humanitarian aid and disaster relief to
              vulnerable communities.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                onClick={enterLogin}
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
          <div className="relative">
            {/* Cards Stack */}
            <div className="relative z-10 space-y-4 max-w-96 mx-auto ">
              {campaigns.map((campaign, index) => (
                <CampaignCard key={index} {...campaign} />
              ))}
            </div>

            <div className="absolute top-0 right-0 w-72 h-[80%] text-blue-500 z-10 hidden md:block">
              <div className="absolute top-20 -right-40 w-full h-full">
                <img src="/homelady.png" alt="Person standing" className="w-full h-full " />
              </div>
            </div>

            <div className="absolute hidden md:block -bottom-36 -left-48  w-80 h-96 text-blue-500 z-10">
              
              <img src="/homechair.png" alt="Person standing" className="w-full h-full " />

            </div>
          </div>
        </div>
      <TopCho/>
      </div>
    </div>
  );
};

export default LandingPage;