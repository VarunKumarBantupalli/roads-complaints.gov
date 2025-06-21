// src/components/Camera.jsx

import React from 'react';
import {  Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Camerabar = () => {
  return (
    <div className="fixed bottom-0 w-full bg-transparent text-white py-3 px-6 flex justify-center items-center z-50 md:px-16 lg:px-32">
     

      <Link to={"/user-dashboard"} className="relative">
      <div className=" cursor-pointer flex flex-col items-center bg-black hover:bg-gray-600 rounded-full p-3 -mt-10 shadow-lg">
        <Camera size={28} className="text-white" />
      </div>
      </Link>

      
    </div>
  );
};

export default Camerabar;
