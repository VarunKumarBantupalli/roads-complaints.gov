

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to login
    navigate('/login');
  }, [navigate]);

  return null; // Optional: add a spinner or "Logging out..." message
};

export default Logout;
