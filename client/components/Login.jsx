// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-without-background.png';
import damaged_road from "../assets/images/damaged_Road.png";
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ridewise.onrender.com/api/auth/login', { email, password });
      const { user, token, role, district } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'officer') {
        localStorage.setItem('district', district);
        navigate('/officer-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center px-6 space-y-4">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-auto animate-fade-in"
        />
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 text-center text-sm">
          We're glad to see you again. Let's get you logged in.
        </p>
        <img
          src={damaged_road}
          alt="Damaged Road"
          className="w-[80%] h-auto max-w-md rounded-xl shadow-lg animate-fade-in-up"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-8 bg-white shadow-xl rounded-lg m-4">
        <h2 className="text-2xl font-semibold mb-1 text-gray-800 flex items-center gap-2">
          <LogIn className="w-6 h-6" /> Sign In
        </h2>
        <p className="mb-4 text-sm text-gray-500">Access your account securely</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-800 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-800 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-600  bg-black text-white font-semibold rounded cursor-pointer transition-all"
          >
            <LogIn className="w-5 h-5 " /> Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-gray-800  font-medium hover:underline cursor-pointer flex justify-center items-center gap-1"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
