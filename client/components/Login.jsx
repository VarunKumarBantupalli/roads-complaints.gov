// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/3 items-center justify-center bg-white h-full">
        <img
          src={logo} // Replace this with your actual image path
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Hello!</h2>
        <h3 className="text-lg font-medium mb-4 text-purple-700">Good Morning</h3>
        <h4 className="mb-4 text-sm">
          <span className="text-purple-600 font-semibold">Login</span> to your account
        </h4>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 border-b border-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border-b border-purple-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-purple-600" />
              Remember
            </label>
            <span className="cursor-pointer text-purple-600 hover:underline">
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            className="py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 transition"
          >
            SUBMIT
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
             <span onClick={ ()=> {navigate('/register')} } className="text-purple-600 cursor-pointer hover:underline">
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
