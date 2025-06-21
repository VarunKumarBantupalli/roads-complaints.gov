import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, FileSearch } from 'lucide-react';

const Landing = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center justify-start px-6 sm:px-12"
      style={{  backgroundImage: "url('https://cdn.thedecorjournalindia.com/wp-content/uploads/2022/03/Walking-Through-The-Amaravati-Government-Complex-Designed-By-Foster-Partners-2.jpg?strip=all&lossy=1&resize=1920%2C1079&ssl=1')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-2xl text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-md">
          Welcome to Ridewise
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 max-w-md drop-shadow-md">
          Empowering citizens to raise, track, and resolve road-related issues in your city with ease and transparency.
        </p>

        <div className="flex space-x-4 sm:space-x-6">
          <Link to="/responses" className="flex items-center space-x-2">
            <div className="bg-black hover:text-black  text-white px-4 py-2 rounded-2xl transition flex items-center justify-center">
              <FileSearch className="h-5 w-5" />
              <span className="  ml-2">All Responses</span>
            </div>
          </Link>

          {/* Raise Complaint */}
          <Link to= "/user-dashboard" className="flex items-center space-x-2">
            <div className="bg-black hover:text-black  text-white px-4 py-2 rounded-2xl transition flex items-center justify-center">
              <Megaphone className="h-5 w-5" />
              <span className="  ml-2">Raise Complaint</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
