import React from 'react';

import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"; // update the path if needed

const Marketing = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Side Image */}
        <div className="max-w-sm sm:max-w-md lg:max-w-sm">
          <img
            src={logo}
            alt="Report a Road Issue"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <p className="text-xl sm:text-2xl font-semibold text-center mt-6 text-gray-800">
            Raise a Complaint? <br />
            Report an Issue? <br />
            Got a Concern?
          </p>
        </div>

        {/* Right Side Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            "Snap a photo,<br />
            upload it,<br />
            and we'll take it from there!"
          </h2>
          <button
            onClick={() => navigate('/complaint')}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Raise Complaint
          </button>
        </div>
      </div>
    </section>
  );
};

export default Marketing;
