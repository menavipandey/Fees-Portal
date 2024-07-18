import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (clear session, etc.)
    // For demo purposes, simulate clearing session
    console.log('Logging out...');

    // Redirect to login page
   navigate('/'); // Replace with your actual login route
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
