import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full animate-spin" />
        
      </div>
    </div>
  );
};

export default Loading;
