import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // used as background

const Landing = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center justify-start px-6 sm:px-12"
      style={{  backgroundImage: "url('https://htmlburger.com/blog/wp-content/uploads/2023/12/State-of-Mississippi-Government-Website.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-2xl text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-md">
          Welcome to Ridewise
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 max-w-md drop-shadow-md">
          Empowering citizens to raise, track, and resolve road-related issues in your city with ease and transparency.
        </p>

        <div className="space-x-4">
          <Link
            to="/complaints"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md transition"
          >
            Raise Complaint
          </Link>

          <Link
            to="/responses"
            className="inline-block bg-white text-gray-900 hover:bg-gray-200 px-6 py-2 rounded shadow-md transition"
          >
            View Responses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
