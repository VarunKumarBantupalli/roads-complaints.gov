// src/components/Camera.jsx

import React from 'react';
import { Home, Search, Bell, Clock, Camera } from 'lucide-react';

const Camerabar = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black text-white py-3 px-6 flex justify-between items-center z-50 md:px-16 lg:px-32">
      {/* Home Icon */}
      <div className="flex flex-col items-center">
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </div>

      {/* Search Icon */}
      <div className="flex flex-col items-center">
        <Search size={24} />
        <span className="text-xs mt-1">Search</span>
      </div>

      {/* Camera Icon (Center) */}
      <div className="flex flex-col items-center bg-purple-600 rounded-full p-3 -mt-10 shadow-lg">
        <Camera size={28} className="text-white" />
      </div>

      {/* Alerts Icon */}
      <div className="flex flex-col items-center">
        <Bell size={24} />
        <span className="text-xs mt-1">Alerts</span>
      </div>

      {/* History Icon */}
      <div className="flex flex-col items-center">
        <Clock size={24} />
        <span className="text-xs mt-1">History</span>
      </div>
    </div>
  );
};

export default Camerabar;
