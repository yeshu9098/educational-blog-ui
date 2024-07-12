// Logout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect to login or home page
    navigate('/login'); // Replace with your login route
  };

  return (
    <div>
      <button className="btn btn-dark btn-block square-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
