import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LogIn, Megaphone, FileSearch } from 'lucide-react';

import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 sm:h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center h-full">
          <img
            src={logo}
            alt="logo"
            className="h-[70%] w-auto object-contain rounded-full"
          />
        </Link>

        {/* Menu Items */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* All Responses */}
          <Link to="/responses" className="flex items-center space-x-2">
            <div className="hover:bg-white hover:text-black  text-white px-4 py-2 rounded-2xl transition flex items-center justify-center">
              <FileSearch className="h-5 w-5" />
              <span className="hidden md:inline ml-2">All Responses</span>
            </div>
          </Link>

          {/* Raise Complaint */}
          <Link to={user ? "/user-dashboard" : "/login"} className="flex items-center space-x-2">
            <div className="hover:bg-white hover:text-black  text-white px-4 py-2 rounded-2xl transition flex items-center justify-center">
              <Megaphone className="h-5 w-5" />
              <span className="hidden md:inline ml-2">Raise Complaint</span>
            </div>
          </Link>

          {/* User Section */}
          {user ? (
            <>
              <span className="  text-lg text-yellow-500  ">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="hover:bg-white hover:text-black  text-white px-4 py-1 rounded transition-shadow"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
            >
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
