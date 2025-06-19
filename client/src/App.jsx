import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserDashboard from '../pages/UserDashboard';
import OfficerDashboard from '../pages/OfficerDashboard';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute'
import Logout from '../components/Logout';
import ComplaintResponse from '../components/ComplaintResponse';
import ScrollToTop from '../components/ScrollToTop';
import Responses from '../components/Responses';

// import AdminPanel from '../pages/AdminPanel';




const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/responses" element={<Responses />} />

         
        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute allowedRole="officer">
              <OfficerDashboard />
              
              
            </ProtectedRoute>
          }   
        />
        <Route path="/respond/:id" element={<ComplaintResponse />} />
        

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


