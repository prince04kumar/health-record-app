import React from 'react';

const CampaignCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-40 h-40">
          <img
            src="/api/placeholder/160/160"
            alt="Children studying"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <h3 className="font-bold text-lg mb-2">
            Educate 500 Orphans in Syria
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Education
            </span>
            
            <button 
              className="text-blue-600 text-sm hover:underline"
              onClick={() => console.log('View more clicked')}
            >
              View more
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-full rounded-full"
              style={{ width: '60%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;