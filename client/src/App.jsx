import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserDashboard from '../pages/UserDashboard';
import OfficerDashboard from '../pages/OfficerDashboard';
import AdminPanel from '../pages/AdminPanel';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Route */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Officer Route */}
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
