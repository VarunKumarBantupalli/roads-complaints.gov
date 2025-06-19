import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Replace with actual user state logic
  const user = JSON.parse(localStorage.getItem("user")); // or useContext/auth state

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1e293b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition">
          Ridewise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/responses" className="hover:text-blue-400 transition">All Responses</Link>

          {user ? (
            <Link to="/complaints" className="hover:text-blue-400 transition">Raise Complaint</Link>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition">Raise Complaint</Link>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] px-4 pb-4 space-y-3">
          <Link to="/responses" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>
            All Responses
          </Link>
          <Link
            to={user ? "/complaints" : "/login"}
            className="block hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Raise Complaint
          </Link>

          {user ? (
            <>
              <span className="block text-sm text-gray-300">Hi, {user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-blue-400 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
