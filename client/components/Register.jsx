// src/pages/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage:  "url('https://cdn.thedecorjournalindia.com/wp-content/uploads/2022/03/Walking-Through-The-Amaravati-Government-Complex-Designed-By-Foster-Partners-2.jpg?strip=all&lossy=1&resize=1920%2C1079&ssl=1')" }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>

      {/* Heading */}
      <div className="relative z-10 text-center text-slate-700">
        <h1 className="text-4xl m-10 font-bold">Create Your Account</h1>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-opacity-40 backdrop-blur-sm border border-white p-10 rounded-lg shadow-2xl w-[90%] max-w-md">
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block text-white font-semibold mb-1">Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md bg-gray-800 text-white focus:outline-none"
            required
          />

          <label className="block text-white font-semibold mb-1">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md bg-gray-800 text-white focus:outline-none"
            required
          />

          <label className="block text-white font-semibold mb-1">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 border rounded-md bg-gray-800 text-white focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-2 border-2 bg-transparent cursor-pointer hover:text-gray-400 rounded-md text-white font-semibold transition"
          >
            Register
          </button>

          <div className="flex justify-between items-center mt-6 text-white">
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white hover:bg-black hover:text-white cursor-pointer text-black rounded-md transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
